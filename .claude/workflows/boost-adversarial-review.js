export const meta = {
  name: 'boost-adversarial-review',
  description: 'Multi-lens review of a change; every finding must survive independent refutation votes before it is reported',
  whenToUse: 'T3 / large-diff review gate before declaring work done. Args: {target, lenses?, votes?, quorum?, context?, effort?, model?} — pass the active profile values (reviewLenses, refuteVotes, surviveQuorum, hardStepEffort; team mode: model from roles.review); workflows cannot read boost.config.json themselves.',
  phases: [
    { title: 'Probe', detail: 'confirm the review target is non-empty' },
    { title: 'Find', detail: 'one fresh reviewer per lens' },
    { title: 'Verify', detail: 'independent skeptics vote on every finding' },
  ],
}

if (!args || !args.target) {
  throw new Error('Pass args: {target: "<what to review, e.g. `git diff main...HEAD` or a file list>", lenses?: string[], votes?: number, quorum?: number, context?: string}')
}
const target = args.target
const context = args.context || ''
const votes = Math.max(1, Math.min(5, args.votes || 2))
const quorum = Math.max(1, Math.min(votes, args.quorum || Math.floor(votes / 2) + 1))
const effort = args.effort || 'high'
// Optional model override for team mode (e.g. review on Opus while the
// session runs Fable). Omitted -> agents inherit the session model, which
// preserves the single-model guarantee of the opus/sonnet profiles.
const model = args.model || null
const withModel = (opts) => (model ? { ...opts, model } : opts)

const LENS_PROMPTS = {
  correctness: 'Logic errors: wrong or inverted conditions, off-by-one, broken control flow, misused APIs, corrupted state. Would this compute the wrong thing on ANY input?',
  'edge-cases': 'Empty/null/zero/negative/huge inputs, unicode, first/last iteration, concurrency, timeouts, partial failure, error paths that are never exercised.',
  security: 'Injection, path traversal, secrets in code or logs, missing authorization, unsafe deserialization, SSRF/XSS. Assume a hostile caller.',
  simplicity: 'Dead code, duplication, reimplementation of an existing helper in this repo, needless abstraction, complexity the next maintainer will curse.',
  'requirements-coverage': 'The change vs. its stated intent: silently dropped requirements, half-implemented behavior, leftover TODOs, tests that do not actually test the change.',
  performance: 'N+1 patterns, quadratic loops over unbounded input, sync IO on hot paths, missing caching where the codebase caches, unbounded memory growth.',
}
const lenses = (args.lenses && args.lenses.length)
  ? args.lenses
  : ['correctness', 'edge-cases', 'security', 'simplicity', 'requirements-coverage']

const FINDINGS_SCHEMA = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          file: { type: 'string', description: 'Repo-relative path' },
          line: { type: 'integer', description: '1-based line the defect anchors to' },
          severity: { type: 'string', enum: ['critical', 'major', 'minor'] },
          summary: { type: 'string', description: 'One-sentence statement of the defect' },
          scenario: { type: 'string', description: 'Concrete trigger: this input/state/sequence -> this wrong outcome' },
        },
        required: ['file', 'line', 'severity', 'summary', 'scenario'],
      },
    },
  },
  required: ['findings'],
}

const VERDICT_SCHEMA = {
  type: 'object',
  properties: {
    holds: { type: 'boolean', description: 'true only if you demonstrated the defect is real' },
    reason: { type: 'string', description: 'What you traced or executed, and what you observed' },
  },
  required: ['holds', 'reason'],
}

// Guard against a vacuous pass: an empty diff/file list would sail through
// every lens with zero findings and look like a clean review.
phase('Probe')
const PROBE_SCHEMA = {
  type: 'object',
  properties: {
    empty: { type: 'boolean', description: 'true if the target resolves to no reviewable content' },
    note: { type: 'string', description: 'What you ran/read and what it produced' },
  },
  required: ['empty', 'note'],
}
const probe = await agent(
  `Check whether this review target resolves to actual reviewable content — run the command or list the files and look at the output size. Do NOT review anything, just probe.\n\nREVIEW TARGET: ${target}\n\nempty=true if it produces no diff/no existing files (e.g. wrong base branch, nothing committed).`,
  withModel({ label: 'probe:target', phase: 'Probe', schema: PROBE_SCHEMA, effort: 'low' })
)
if (probe && probe.empty) {
  throw new Error(`Review target "${target}" resolved to no content (${probe.note}). An empty target is a misconfiguration, not a clean review — fix the target (e.g. diff against the repo's actual default branch, or pass explicit files) and re-run.`)
}

const results = await pipeline(
  lenses,
  (lens) => agent(
    `You are a code reviewer with exactly one lens: ${lens}.
${LENS_PROMPTS[lens] || 'Apply the lens named above rigorously.'}

REVIEW TARGET: ${target}
${context ? `CONTEXT / INTENT:\n${context}\n` : ''}
Inspect the actual code (run the target command / read the files — never review from imagination). Report ONLY defects you can anchor to a file and line with a concrete failure scenario. An empty findings list is a perfectly good answer; padding with speculative findings is not.`,
    withModel({ label: `find:${lens}`, phase: 'Find', schema: FINDINGS_SCHEMA, effort })
  ),
  (review, lens) => parallel(((review && review.findings) || []).map((f) => () =>
    parallel(Array.from({ length: votes }, (_, v) => () =>
      agent(
        `You are skeptic ${v + 1} of ${votes}, working independently. A reviewer claims this defect exists:

${JSON.stringify(f, null, 2)}

REVIEW TARGET: ${target}

Try to REFUTE it against the actual code: read ${f.file} around line ${f.line}, trace the path, execute a probe if cheap. Answer holds=true ONLY if you can demonstrate the defect is real (concrete trace or reproduction). If the scenario cannot actually happen, if the code already handles it, or if you cannot make it concrete, answer holds=false and say why.`,
        withModel({ label: `verify:${f.file}:${f.line}`, phase: 'Verify', schema: VERDICT_SCHEMA, effort })
      )
    )).then((vs) => {
      const cast = vs.filter(Boolean)
      const held = cast.filter((v) => v.holds).length
      // No vote agents survived -> verification infrastructure failed; that is
      // NOT a refutation, so keep the finding visible as UNVERIFIABLE.
      const status = cast.length === 0 ? 'UNVERIFIABLE' : (held >= quorum ? 'CONFIRMED' : 'REJECTED')
      return { ...f, lens, votesCast: cast.length, votesHeld: held, status, voteReasons: cast.map((v) => (v.holds ? 'HOLDS: ' : 'refuted: ') + v.reason) }
    })
  ))
)

const all = results.filter(Boolean).flat().filter(Boolean)
// Dedup cross-lens echoes of the same defect. Distinct confirmed defects can
// share a file:line, so keep ALL confirmed findings in a group and drop only
// the non-confirmed echoes; groups with no confirmed finding keep one entry
// (preferring UNVERIFIABLE over REJECTED so infra failures stay visible).
const byKey = {}
for (const f of all) {
  const key = `${f.file}:${f.line}`
  ;(byKey[key] = byKey[key] || []).push(f)
}
const deduped = []
for (const group of Object.values(byKey)) {
  const conf = group.filter((f) => f.status === 'CONFIRMED')
  if (conf.length) { deduped.push(...conf); continue }
  deduped.push(group.find((f) => f.status === 'UNVERIFIABLE') || group[0])
}
const rank = { critical: 0, major: 1, minor: 2 }
const confirmed = deduped.filter((f) => f.status === 'CONFIRMED').sort((a, b) => (rank[a.severity] ?? 3) - (rank[b.severity] ?? 3))
const unverifiable = deduped.filter((f) => f.status === 'UNVERIFIABLE').map((f) => ({ file: f.file, line: f.line, severity: f.severity, summary: f.summary, scenario: f.scenario, lens: f.lens }))
const rejected = deduped.filter((f) => f.status === 'REJECTED').map((f) => ({ file: f.file, line: f.line, summary: f.summary, votesHeld: f.votesHeld, votesCast: f.votesCast }))

log(`${all.length} raw findings -> ${deduped.length} unique -> ${confirmed.length} confirmed, ${unverifiable.length} unverifiable (quorum ${quorum}/${votes})`)

return { confirmed, unverifiable, rejected, lensesRun: lenses, votes, quorum }
