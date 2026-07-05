export const meta = {
  name: 'boost-judge-panel',
  description: 'N independent solution candidates from distinct lenses, scored by a judge panel, synthesized into one recommendation',
  whenToUse: 'T2/T3 design, architecture, or planning decisions where the solution space is wide. Args: {task, context?, candidates?, judges?, effort?, model?} — pass the active profile values (planCandidates, judges, hardStepEffort); workflows cannot read boost.config.json themselves.',
  phases: [
    { title: 'Generate', detail: 'independent candidates, one per lens, fresh contexts' },
    { title: 'Judge', detail: 'each judge scores every candidate' },
    { title: 'Synthesize', detail: 'winner merged with the best ideas of runners-up' },
  ],
}

if (!args || !args.task) {
  throw new Error('Pass args: {task: "<decision or problem statement>", context?: string, candidates?: number, judges?: number}')
}
const task = args.task
const context = args.context || 'Ground yourself in the repository in the current working directory: read the relevant code before designing.'
const nCand = Math.max(2, Math.min(5, args.candidates || 3))
const nJudge = Math.max(2, Math.min(5, args.judges || 3))
const effort = args.effort || 'high'
// Optional model override for team mode; omitted -> inherit the session model.
const model = args.model || null
const withModel = (opts) => (model ? { ...opts, model } : opts)

const LENSES = [
  'SIMPLICITY — the simplest design that fully satisfies every requirement; fewest moving parts, least new surface area',
  'ROBUSTNESS — failure modes first: edge cases, error handling, bad input, concurrency, partial failure',
  'REQUIREMENTS — user intent first: enumerate every explicit and implicit requirement, then satisfy all of them completely',
  'EVOLUTION — maintainability first: how this will be read, tested, extended, and migrated over the next year',
  'PERFORMANCE — efficiency and scale characteristics under realistic and worst-case load',
]

const CANDIDATE_SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string', description: 'Short name for the approach' },
    summary: { type: 'string', description: 'The approach in <=5 sentences' },
    design: { type: 'string', description: 'Complete design: components, data flow, key decisions, file-level changes with file:line anchors into the actual repo' },
    tradeoffs: { type: 'string', description: 'What this approach gives up' },
    risks: { type: 'array', items: { type: 'string' }, description: 'Concrete scenarios most likely to break it' },
  },
  required: ['title', 'summary', 'design', 'tradeoffs', 'risks'],
}

phase('Generate')
const candidates = (await parallel(Array.from({ length: nCand }, (_, i) => () =>
  agent(
    `You are one of ${nCand} designers independently solving the same problem; you cannot see the others' work — commit hard to your own lens instead of hedging toward a middle ground.

YOUR LENS: ${LENSES[i % LENSES.length]}

PROBLEM:
${task}

CONTEXT:
${context}

Produce ONE complete, concrete solution design, optimized through your lens while still satisfying all requirements. Ground it in the actual repository: open the files you propose to change. Another agent must be able to implement from your design alone.`,
    withModel({ label: `candidate:${i + 1}`, phase: 'Generate', schema: CANDIDATE_SCHEMA, effort })
  )
))).filter(Boolean)

if (candidates.length < 2) {
  throw new Error(`Only ${candidates.length} candidate(s) produced; need at least 2 to judge`)
}
log(`${candidates.length} candidates generated: ${candidates.map((c) => c.title).join(' | ')}`)

const menu = candidates.map((c, i) =>
  `--- CANDIDATE ${i + 1}: ${c.title} ---\nSummary: ${c.summary}\nDesign: ${c.design}\nTrade-offs: ${c.tradeoffs}\nRisks: ${c.risks.join('; ')}`
).join('\n\n')

const SCORE_SCHEMA = {
  type: 'object',
  properties: {
    scores: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          candidate: { type: 'integer', description: '1-based candidate number' },
          score: { type: 'integer', description: '0-10' },
          strongest: { type: 'string', description: 'Its single strongest property' },
          fatal: { type: 'string', description: 'Fatal flaw if any, else empty string' },
        },
        required: ['candidate', 'score', 'strongest', 'fatal'],
      },
    },
    best: { type: 'integer', description: '1-based number of the best candidate overall' },
  },
  required: ['scores', 'best'],
}

phase('Judge')
const verdicts = (await parallel(Array.from({ length: nJudge }, (_, i) => () =>
  agent(
    `You are judge ${i + 1} of ${nJudge} on an independent panel; you cannot see the other judges. Score EVERY candidate solution for the problem below on: (1) full requirements coverage, (2) correctness and robustness, (3) simplicity, (4) fit with the existing codebase. Where a design makes cheap-to-check claims about the repository, verify them against the actual code before scoring. Penalize hedged, incomplete, or ungrounded designs hard.

PROBLEM:
${task}

${menu}

Score each candidate 0-10, name its strongest property and any fatal flaw, then pick the best overall.`,
    withModel({ label: `judge:${i + 1}`, phase: 'Judge', schema: SCORE_SCHEMA, effort })
  )
))).filter(Boolean)

if (!verdicts.length) throw new Error('All judges failed; cannot score candidates')

// Average over the judges that actually scored each candidate — a judge that
// omitted or misnumbered a candidate casts no vote on it, not a zero.
const averages = candidates.map((_, i) => {
  let sum = 0, n = 0
  for (const v of verdicts) {
    const s = (v.scores || []).find((x) => x.candidate === i + 1)
    if (s) { sum += s.score; n += 1 }
  }
  return n ? Math.round((sum / n) * 10) / 10 : 0
})
const winnerIdx = averages.indexOf(Math.max(...averages))
log(`panel averages [${averages.join(', ')}] -> winner: candidate ${winnerIdx + 1} (${candidates[winnerIdx].title})`)

phase('Synthesize')
const judgeNotes = verdicts.map((v, i) => `Judge ${i + 1} (best=${v.best}): ${JSON.stringify(v.scores)}`).join('\n')
const synthesis = await agent(
  `You are the synthesizer. A panel of ${verdicts.length} judges scored ${candidates.length} independent designs; the winner is CANDIDATE ${winnerIdx + 1} (${candidates[winnerIdx].title}).

PROBLEM:
${task}

ALL CANDIDATES:
${menu}

JUDGE NOTES:
${judgeNotes}

Produce the FINAL recommended design: start from the winner; graft in any clearly superior ideas from the runners-up; resolve every fatal flaw any judge raised (or state precisely why it is not real, verified against the repo). Output a design ready to hand to work-packet decomposition (/boost-plan step 5): approach, requirements coverage, ordered packets with file anchors and per-packet verification, trade-offs, risks.`,
  withModel({ label: 'synthesize', phase: 'Synthesize', effort: 'xhigh' })
)

return {
  winner: candidates[winnerIdx].title,
  panelAverages: candidates.map((c, i) => ({ candidate: c.title, avgScore: averages[i] })),
  synthesis,
}
