export const meta = {
  name: 'boost-deep-research',
  description: 'Multi-angle research sweep with fresh contexts, claim extraction, adversarial verification of load-bearing claims, and cited synthesis',
  whenToUse: 'T2/T3 questions about a codebase or system: audits, "how does X work", "why does Y happen", feasibility checks. Args: {question, context?, angles?, votes?, quorum?, effort?} — pass the active profile values (researchAngles, refuteVotes, surviveQuorum, hardStepEffort); workflows cannot read boost.config.json themselves.',
  phases: [
    { title: 'Sweep', detail: 'independent searchers, one strategy each' },
    { title: 'Distill', detail: 'merge findings into explicit claims' },
    { title: 'Verify', detail: 'skeptics vote on load-bearing claims' },
    { title: 'Synthesize', detail: 'final cited answer' },
  ],
}

if (!args || !args.question) {
  throw new Error('Pass args: {question: "<the research question>", context?: string, angles?: number, votes?: number, quorum?: number}')
}
const question = args.question
const context = args.context || 'The subject is the repository in the current working directory.'
const nAngles = Math.max(2, Math.min(5, args.angles || 4))
const votes = Math.max(1, Math.min(5, args.votes || 2))
const quorum = Math.max(1, Math.min(votes, args.quorum || Math.floor(votes / 2) + 1))
const effort = args.effort || 'high'

const STRATEGIES = [
  'BY-SYMBOL — grep for the identifiers, definitions, and call sites the question implies; follow the references',
  'BY-CONCEPT — find the entry points relevant to the question and follow the actual data/control flow through the code',
  'BY-HISTORY — use git log / git blame / git show on the relevant paths: when and why did this change; what do commit messages reveal',
  'BY-DOCUMENTATION — READMEs, comments, configuration, schemas, and tests-as-documentation; compare what docs claim with what code does',
  'BY-COUNTEREXAMPLE — actively look for evidence AGAINST the obvious answer to the question: exceptions, special cases, dead code, feature flags',
]

const SWEEP_SCHEMA = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          claim: { type: 'string', description: 'One factual statement relevant to the question' },
          evidence: { type: 'string', description: 'file:line, command + output, or URL actually read — no evidence, no claim' },
          confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
        },
        required: ['claim', 'evidence', 'confidence'],
      },
    },
    deadEnds: { type: 'array', items: { type: 'string' }, description: 'What you searched that yielded nothing (so the synthesizer knows coverage)' },
  },
  required: ['findings', 'deadEnds'],
}

phase('Sweep')
const sweeps = (await parallel(Array.from({ length: nAngles }, (_, i) => () =>
  agent(
    `You are one of ${nAngles} researchers independently investigating the same question with different strategies; you cannot see the others.

YOUR STRATEGY: ${STRATEGIES[i % STRATEGIES.length]}

QUESTION:
${question}

CONTEXT:
${context}

Investigate thoroughly using your strategy. Report findings as factual claims, each with the evidence you actually read or executed this session. Also report dead ends — they tell the synthesizer what is known to be absent.`,
    { label: `sweep:${i + 1}`, phase: 'Sweep', schema: SWEEP_SCHEMA, effort }
  )
))).filter(Boolean)

if (!sweeps.length) throw new Error('All sweep agents failed')
const rawFindings = sweeps.flatMap((s) => s.findings || [])
const deadEnds = sweeps.flatMap((s) => s.deadEnds || [])
log(`${sweeps.length}/${nAngles} sweeps returned, ${rawFindings.length} raw claims`)

const DISTILL_SCHEMA = {
  type: 'object',
  properties: {
    claims: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          claim: { type: 'string' },
          evidence: { type: 'string' },
          loadBearing: { type: 'boolean', description: 'true if the final answer flips when this claim is wrong' },
          conflictsWith: { type: 'string', description: 'Summary of any raw claim this contradicts, else empty string' },
        },
        required: ['claim', 'evidence', 'loadBearing', 'conflictsWith'],
      },
    },
  },
  required: ['claims'],
}

phase('Distill')
const distilled = await agent(
  `Merge these raw research findings into a deduplicated set of claims for the question below. Mark each claim loadBearing=true if the final answer flips when it is wrong. Where two raw claims conflict, keep both sides visible via conflictsWith — never average a conflict away.

QUESTION:
${question}

RAW FINDINGS (from ${sweeps.length} independent sweeps):
${JSON.stringify(rawFindings, null, 2)}

DEAD ENDS REPORTED:
${JSON.stringify(deadEnds, null, 2)}`,
  { label: 'distill', phase: 'Distill', schema: DISTILL_SCHEMA, effort }
)

const claims = (distilled && distilled.claims) || []
const toVerify = claims.filter((c) => c.loadBearing || (c.conflictsWith && c.conflictsWith.length))
log(`${claims.length} distilled claims, ${toVerify.length} load-bearing/conflicted -> verifying`)

const VERDICT_SCHEMA = {
  type: 'object',
  properties: {
    holds: { type: 'boolean', description: 'true only if you independently confirmed the claim by observation' },
    reason: { type: 'string', description: 'What you read/executed and observed' },
  },
  required: ['holds', 'reason'],
}

phase('Verify')
const verifiedClaims = await parallel(toVerify.map((c, ci) => () =>
  parallel(Array.from({ length: votes }, (_, v) => () =>
    agent(
      `You are skeptic ${v + 1} of ${votes}, working independently. Verify or refute this research claim by your OWN observation — re-derive it from the source, do not trust the cited evidence blindly:

CLAIM: ${c.claim}
CITED EVIDENCE: ${c.evidence}
CONTEXT: ${context}

Actively try to refute it (look for counterexamples, special cases, misread code). holds=true only if your own observation confirms it.`,
      { label: `verify:${ci + 1}`, phase: 'Verify', schema: VERDICT_SCHEMA, effort }
    )
  )).then((vs) => {
    const cast = vs.filter(Boolean)
    const held = cast.filter((v) => v.holds).length
    // All skeptic agents failing is an infrastructure failure, not a
    // refutation — mark UNVERIFIABLE instead of UNCONFIRMED.
    const status = cast.length === 0 ? 'UNVERIFIABLE' : (held >= quorum ? 'CONFIRMED' : 'UNCONFIRMED')
    return { ...c, votesCast: cast.length, votesHeld: held, status, voteReasons: cast.map((v) => (v.holds ? 'holds: ' : 'refuted: ') + v.reason) }
  })
))

const confirmed = verifiedClaims.filter(Boolean).filter((c) => c.status === 'CONFIRMED')
const unconfirmed = verifiedClaims.filter(Boolean).filter((c) => c.status === 'UNCONFIRMED')
const unverifiable = verifiedClaims.filter(Boolean).filter((c) => c.status === 'UNVERIFIABLE')
const unverified = claims.filter((c) => !toVerify.includes(c))
log(`${confirmed.length} confirmed, ${unconfirmed.length} failed verification, ${unverifiable.length} unverifiable (skeptics errored), ${unverified.length} minor claims unverified`)

phase('Synthesize')
const answer = await agent(
  `Write the final answer to this research question from the verified evidence below. Lead with the answer. Cite evidence per claim. State confidence honestly: CONFIRMED claims were adversarially verified by ${votes} independent skeptics (quorum ${quorum}); UNCONFIRMED claims FAILED verification — if one was going to carry the answer, say the question is unresolved on that point instead of asserting it; UNVERIFIABLE claims could not be checked because verification itself errored — treat them as single-sourced, neither confirmed nor refuted; minor unverified claims are single-sourced. End with what was NOT checked (dead ends, unverifiable and unverified areas).

QUESTION:
${question}

CONFIRMED (adversarially verified):
${JSON.stringify(confirmed, null, 2)}

FAILED VERIFICATION (do not assert these):
${JSON.stringify(unconfirmed, null, 2)}

UNVERIFIABLE (verification errored — single-sourced, not refuted):
${JSON.stringify(unverifiable, null, 2)}

MINOR CLAIMS (single-sourced, unverified):
${JSON.stringify(unverified, null, 2)}

DEAD ENDS:
${JSON.stringify(deadEnds, null, 2)}`,
  { label: 'synthesize', phase: 'Synthesize', effort: 'xhigh' }
)

return { answer, confirmed, failedVerification: unconfirmed, unverifiable, minorUnverified: unverified }
