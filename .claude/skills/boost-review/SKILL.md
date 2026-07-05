---
name: boost-review
description: >-
  BOOST adversarial review protocol — multi-lens review of a change where
  every finding must survive independent refutation, and every confirmed
  finding is fixed and re-verified. Use after /boost-build on any T2/T3
  change, before /boost-verify. For reviewing someone else's PR use /review;
  this skill is the self-review gate for work produced in this session.
---

# BOOST Review

A standalone model reviewing its own fresh output finds ~nothing: it re-reads
its reasoning, not the code. This protocol forces independence — fresh
contexts, one narrow question per pass, and refutation before findings are
believed. Read `.claude/boost.config.json` first; parameters refer to the
active profile.

## Mode A — inline (default for T2, diff under ~150 changed lines)

1. **Lens passes.** For each lens in `reviewLenses`, re-read the *entire
   diff* (`git diff`, not memory) asking only that lens's question:
   - `correctness` — wrong logic, inverted conditions, off-by-one, misused
     APIs, broken state on ANY input?
   - `edge-cases` — empty/null/zero/huge input, unicode, concurrency,
     partial failure, first/last iteration, error paths?
   - `security` — injection, path traversal, secrets in code/logs, missing
     authz, unsafe deserialization? Assume a hostile caller.
   - `simplicity` — dead code, duplication, reimplementing an existing
     helper, needless abstraction?
   - `requirements-coverage` — diff vs. the plan's requirements list:
     anything silently dropped or half-done? Tests that don't actually test
     the change?
2. **Refute your own findings.** For each finding, spend one honest attempt
   to prove it wrong against the actual code. Keep it only if it survives.
3. **Independent skeptic (mandatory).** Spawn one `boost-critic` agent on
   the diff with the requirements attached. Its fresh context is the whole
   point; do not skip because Mode A steps found nothing — *especially* then.

## Mode B — workflow (T3, large diffs, or "be thorough")

Run:

    Workflow {name: "boost-adversarial-review",
              args: {target: "git diff <base>...HEAD",
                     lenses: <reviewLenses>,
                     votes: <refuteVotes>, quorum: <surviveQuorum>,
                     effort: <hardStepEffort>}}

Pass the profile values explicitly — workflows cannot read
`boost.config.json` themselves. **First run the target command yourself and
confirm it is non-empty**: with the wrong base branch (`main` vs `master`)
or uncommitted work, a diff target can be empty and the gate would pass
vacuously. Choose the target that actually contains the work (branch diff,
`git diff HEAD`, or an explicit file list); the workflow also probes for an
empty target and aborts.

One fresh reviewer per lens, then `refuteVotes` independent skeptics vote on
every finding; only findings reaching `surviveQuorum` come back confirmed.
Findings returned as `unverifiable` (skeptic agents errored) must be judged
by you manually — they were not refuted.

## Closing the loop (both modes)

For every confirmed finding: fix it, re-run the verification for the packet
it belongs to, and re-run the single lens that found it on the new diff.
Findings you reject, you reject in writing (one line of why) in the plan
file — silent dismissal is how sub-frontier review fails. Then proceed to
`/boost-verify`.
