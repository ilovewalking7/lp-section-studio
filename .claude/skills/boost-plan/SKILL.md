---
name: boost-plan
description: >-
  BOOST planning protocol — requirements intake, codebase reconnaissance,
  multiple independent plan candidates, adversarial critique, and
  decomposition into verifiable work packets. Use before implementing any
  T2/T3 task, or whenever asked to plan or design an approach. Not for
  trivial (T0/T1) edits.
---

# BOOST Plan

Weaker one-shot planning is the single biggest gap between a standalone model
and a frontier model. This protocol compensates by (a) making requirements
explicit before solutioning, (b) generating *genuinely different* candidate
plans instead of elaborating the first idea, and (c) letting an adversary
attack the plan before any code is written. Read
`.claude/boost.config.json` first; parameter names below refer to the active
profile.

## 1. Requirements intake

Write down (in your plan file, see §5):

- The goal restated in one sentence — *what changes for the user*.
- Every **explicit** requirement from the request.
- Every **implicit** requirement: error handling, tests, docs, i18n,
  backwards compatibility, matching existing conventions.
- Unknowns. Resolve each from the repo or the conversation *now*; only ask
  the user if genuinely undecidable.

## 2. Reconnaissance

Map the code you will touch. If it needs more than a handful of file reads,
spawn one or more `boost-scout` agents (they read; you decide) and keep your
own context clean. You must be able to name the files, entry points, and
conventions involved before choosing an approach — plans invented before
reconnaissance are the classic sub-frontier failure.

## 3. Candidates — never elaborate your first idea

- Generate `planCandidates` **independent** approaches. Independence is the
  point: spawn that many `boost-planner` agents in parallel, one lens each
  (simplest-that-works / robustness-first / requirements-first /
  evolution-first) — fresh contexts give real independence. Generating them
  inline yourself is acceptable only for compact T2 tasks, and then you must
  force each candidate to be genuinely different and complete enough to
  implement.
- For T3 or a wide solution space, run
  `Workflow {name: "boost-judge-panel", args: {task: "…", context: "…",
  candidates: <planCandidates>, judges: <judges>, effort: <hardStepEffort>}}`
  instead — it generates candidates with *fresh contexts*, scores them with
  a judge panel, and synthesizes. Pass the profile values explicitly:
  workflows cannot read `boost.config.json` themselves and would otherwise
  fall back to their own defaults.
- Pick a winner on: requirements coverage → correctness/robustness →
  simplicity → codebase fit. Record why the losers lost (one line each).

## 4. Adversarial critique

Spawn a `boost-critic` agent on the winning plan: "here is the plan and the
requirements — find the concrete scenario where it fails". Revise the plan
for every finding the critic can anchor to something real; note (don't
silently drop) findings you judge wrong. Do not skip this because the plan
"feels solid" — that feeling is exactly what the gate exists for.

## 5. Work packets

Decompose the final plan into ordered packets. Each packet must have:

- **Goal** — one sentence.
- **Files** — what it touches.
- **Verification** — the command/test/observation that proves it, runnable
  at that point (not only at the end).

Size packets so a checkpoint lands at least every `maxUnverifiedSteps`
steps. Write the plan (requirements, decision record, packets, progress
checklist) to a file in the scratchpad directory; `/boost-build` will re-read
it as it goes.

## Output

End with: chosen approach + why, rejected candidates + why (one line each),
critic findings and how each was resolved, and the packet list. Then hand
off to `/boost-build`.
