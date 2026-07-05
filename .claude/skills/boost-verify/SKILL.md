---
name: boost-verify
description: >-
  BOOST evidence gate — the final check before any T2+ work may be reported
  as done. Defines what counts as evidence for each kind of claim and the
  definition-of-done checklist. Use at the end of every boost-build /
  boost-debug flow, and whenever about to tell the user something "works".
  (T1 work uses the lighter CLAUDE.md §3 self-review, but the evidence
  standard below applies to completion claims at every tier.)
---

# BOOST Verify

The cheapest way for a standalone model to look frontier-tier is to *sound*
finished. This gate makes "done" a property of observed evidence, not of
prose confidence.

## Evidence standard

A claim may be reported only with its matching evidence, produced **this
session**:

| Claim | Acceptable evidence |
|-------|--------------------|
| "The feature works" | You exercised the real flow end-to-end and observed the result (ran the app/CLI/endpoint — use `/verify` or `/run` if the project has a runtime surface) |
| "The bug is fixed" | The reproduction that failed before now passes, unmodified |
| "Tests pass" | Test runner output from after your last edit |
| "This handles edge case X" | A test or executed probe of X — or a `file:line` trace of why X is impossible |
| "Nothing else is affected" | The project's full test/lint/build commands ran green; callers of changed symbols were grep-checked |
| "The docs/config are right" | You re-read the final artifact top to bottom after the last edit |

Inference ("the types check, so…"), simulation ("this would print…"), and
pre-edit observations are **not** evidence.

## Independent verification

For T2+: at least one claim — the load-bearing one — must be verified by a
`boost-verifier` agent that starts from the claim alone and reproduces it
from scratch, without your reasoning in its context. If it comes back
REFUTED or INCONCLUSIVE, the work is not done; go back to `/boost-debug` or
`/boost-build`.

## Definition of done — all boxes, or say which are open

- [ ] Every requirement from the plan's intake list satisfied or explicitly
      reported as not done
- [ ] Every work packet's own verification ran green after the final edit
- [ ] Project-level checks (tests, lint, typecheck, build — whatever exists)
      ran green after the final edit
- [ ] Adversarial review (`/boost-review`) completed; confirmed findings
      fixed, rejected findings recorded with reasons
- [ ] New behavior covered by a test, or the absence of a test justified
- [ ] Final report written from evidence: what changed, how it was verified
      (commands + observed results), what was NOT done or verified

## Reporting

Lead with the outcome, then the evidence table (claim → how verified).
Failures and open boxes are reported as failures and open boxes. A partially
done task reported honestly is a success of this framework; a fully done
report that turns out false is its worst failure.
