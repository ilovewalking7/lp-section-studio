---
name: boost-research
description: >-
  BOOST research protocol — decompose a question, sweep it from multiple
  independent angles, adversarially verify load-bearing claims, and
  double-derive key conclusions before answering. Use for any nontrivial
  question about a codebase, system, or external topic (T2/T3 questions,
  audits, "how does X work", "why does Y happen", technology decisions).
  Not for facts directly readable from context (T0).
---

# BOOST Research

Standalone models answer hard questions from the first plausible narrative
they assemble. This protocol forces coverage (multiple search angles),
skepticism (claims must survive refutation), and self-consistency (key
conclusions derived twice). Read `.claude/boost.config.json` first;
parameters refer to the active profile.

## 1. Decompose

Split the question into the sub-questions that must be true/false for an
answer to be right. Write them down. An answer that doesn't cover all
sub-questions is not done.

## 2. Sweep — `researchAngles` independent angles

Cover the question from genuinely different directions, in parallel
(`boost-scout` agents for repo questions; web search where relevant and
permitted):

- **by symbol** — grep identifiers, definitions, call sites
- **by concept** — entry points, then follow the data flow
- **by history** — `git log` / `git blame`: when and why it changed
- **by documentation** — READMEs, comments, configs, tests-as-docs
- **by web** — official docs/references (external topics)

For big questions run
`Workflow {name: "boost-deep-research", args: {question: "…",
angles: <researchAngles>, votes: <refuteVotes>, quorum: <surviveQuorum>,
effort: <hardStepEffort>}}` — it runs the sweep with fresh contexts,
extracts claims, and verifies the load-bearing ones. Pass the profile values
explicitly: workflows cannot read `boost.config.json` themselves and would
otherwise fall back to their own defaults.

## 3. Claims table

Reduce findings to explicit claims, each with: evidence (`file:line`, command
output, or URL actually read this session), and confidence (high / medium /
low). A claim with no evidence pointer is a guess — label it as one or drop
it.

## 4. Adversarial verification

For each **load-bearing** claim (one that, if wrong, flips the answer):
spawn `refuteVotes` `boost-critic`/`boost-verifier` agents to refute it
against the actual source. It survives only with `surviveQuorum` holds.

## 5. Double derivation

Per the profile's `doubleDerivation` setting, re-derive key conclusions via
an independent route (different angle, different starting point — ideally a
fresh agent that doesn't see your first derivation). If the two derivations
disagree, that disagreement is your most important finding: resolve it
before answering, never average over it.

## 6. Answer

Lead with the answer. Then evidence per claim, confidence levels, and — 
honestly — what was not checked. "I verified A and B; C is inferred" beats a
uniformly confident answer that is 90% verified.
