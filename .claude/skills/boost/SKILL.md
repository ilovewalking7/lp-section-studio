---
name: boost
description: >-
  BOOST router — entry point of the single-model capability framework. Use at
  the start of any substantive task (feature, refactor, bug fix, design
  decision, audit, research question), or when the user types /boost.
  Classifies the task T0–T3, loads the active profile from
  .claude/boost.config.json, and routes to the matching boost protocol skill
  or workflow. Do NOT use for trivial one-line answers or edits (T0).
---

# BOOST Router

BOOST closes the gap between the session model (Opus 4.8 or Sonnet 5) and a
frontier-tier model with structure: decomposition, independent candidates,
adversarial verification, closed-loop evidence. This skill decides *how much*
structure the current task gets. Applying the full protocol to a trivial task
wastes tokens; skipping it on a hard task produces frontier-looking output
with sub-frontier correctness. Route deliberately.

## Step 0 — load the profile

Read `.claude/boost.config.json`. Note the `activeProfile` and its parameters
(`planCandidates`, `judges`, `refuteVotes`, `surviveQuorum`, `reviewLenses`,
`maxUnverifiedSteps`, `researchAngles`, `doubleDerivation`,
`hardStepEffort`). All boost skills reference these names. If the file is
missing, use the `sonnet` defaults from the framework docs (the more
conservative set).

## Step 1 — classify

- **T0**: answerable/doable directly from context, zero blast radius.
- **T1**: small well-specified change (≤ ~2 files) or modest research.
- **T2**: multi-file feature, refactor, nontrivial bug, design question,
  anything where you interpreted a spec.
- **T3**: architecture, security-sensitive, irreversible, "be thorough /
  audit", correctness-critical.

Signals that force an upgrade: you had to guess what the user meant; the
change touches shared/foundational code; a mistake would be expensive to
notice; the user asked for thoroughness. When torn, go higher.

## Step 2 — route

| Tier | Route |
|------|-------|
| T0 | Do it directly. Stop reading this skill. |
| T1 | Inline: silent plan → act → verify by running something → CLAUDE.md §3 self-review. No subagents needed. |
| T2 build task | `/boost-plan` → `/boost-build` → `/boost-review` → `/boost-verify` |
| T2 bug | `/boost-debug` (it embeds build/review/verify for the fix) |
| T2 question | `/boost-research` |
| T3 | As T2, plus: design via `Workflow {name: "boost-judge-panel"}`, and final gate via `Workflow {name: "boost-adversarial-review"}` |

If the active profile has `mode: "team"` (default: `fable`), overlay
`/boost-team` on T2/T3 build routes: plan stays with the session model,
build packets go to `model: "sonnet"` builders, review/critique goes to
`model: "opus"` agents (and `args.model: "opus"` for the review workflow).
Under `mode: "single"`, never override agent models.

## Step 3 — inline vs. workflow

The protocols have two execution modes; pick by size, not by mood:

- **Inline mode** (you + a couple of Agent-tool subagents): default for T2.
- **Workflow mode** (`boost-judge-panel`, `boost-adversarial-review`,
  `boost-deep-research`): use when T3, when the diff/question is large, or
  when the user asked for thoroughness. Workflows inherit the session model —
  they add *independence and redundancy*, not a bigger model. Workflows
  cannot read `boost.config.json`: always pass the relevant profile values
  via `args` (each protocol skill shows the exact invocation template).

## Anti-overkill guard

BOOST must never make simple things slow. If mid-protocol you discover the
task is actually T0/T1 (e.g. the "bug" is a typo), downgrade immediately,
finish directly, and say so. Ceremony without payoff erodes trust in the
framework.

## Always-on rules

Whatever the tier, the CLAUDE.md hard gates apply: evidence before "done",
≤ `maxUnverifiedSteps` edits between checkpoints, honest reporting.
