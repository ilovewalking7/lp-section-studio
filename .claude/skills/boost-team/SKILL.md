---
name: boost-team
description: >-
  BOOST team mode — role-based model routing, the DEFAULT for building apps,
  SaaS products, and features when the session model is Fable 5
  (activeProfile "fable"). Planning and ideation stay with Fable 5 (the
  session), implementation packets are delegated to Sonnet 5 builder agents,
  and code review/critique runs on Opus 4.8 agents. Use for any T2/T3 build
  task under the fable profile. Not for single-model sessions (opus/sonnet
  profiles run classic single-model BOOST instead).
---

# BOOST Team Mode

One model doing everything wastes the strengths of each. Team mode assigns
BOOST's phases to the model best suited for them, per the `roles` map of the
active profile (`.claude/boost.config.json`, profile `fable`):

| Role | Model | Who runs it | Why |
|------|-------|-------------|-----|
| `plan` | **Fable 5** | The session main loop — never delegated | Highest-reasoning model owns requirements, ideas, architecture, decisions, synthesis, and final judgment |
| `build` | **Sonnet 5** | `boost-builder` agents via the Agent tool with `model: "sonnet"` | Fast, cheap, excellent at well-specified implementation packets |
| `review` | **Opus 4.8** | `boost-critic` / `boost-verifier` agents with `model: "opus"`; workflows with `args.model: "opus"` | A *different strong model* reviewing Sonnet's code kills blind spots two instances of one model share |

All BOOST hard gates (CLAUDE.md §2) apply unchanged — team mode changes who
does the work, never the evidence standard.

## The loop

1. **Plan (Fable, you).** Run `/boost-plan` yourself: requirements intake,
   reconnaissance (scouts may inherit the session model), candidates,
   critique, work packets. Packet specs must be *complete* — Sonnet builders
   implement exactly what the packet says, so ambiguity in = defects out.
2. **Build (Sonnet).** For each packet, spawn a `boost-builder` agent with
   `model: "sonnet"`, passing the full packet spec (goal, files, constraints,
   conventions, verification command). Independent packets run in parallel.
   You (Fable) spot-check each returned diff and its verification evidence
   before accepting the packet — you are the integrator, not a spectator.
3. **Check (Opus).** Route `/boost-review` skepticism to Opus:
   - Inline mode: spawn `boost-critic` with `model: "opus"` on the diff.
   - Workflow mode: `Workflow {name: "boost-adversarial-review", args:
     {target: "git diff <base>...HEAD", lenses: <reviewLenses>,
     votes: <refuteVotes>, quorum: <surviveQuorum>,
     effort: <hardStepEffort>, model: "opus"}}`.
   - Independent claim verification: `boost-verifier` with `model: "opus"`.
4. **Decide (Fable, you).** Triage Opus's findings, dispatch fixes back to
   Sonnet builders (or fix inline if trivial), re-run the failed lens, then
   close with `/boost-verify` — evidence observed this session, as always.

## Rules

- **Plan is never delegated.** Ideas, architecture, trade-off decisions, and
  the final "done" call belong to the session model.
- **Builders get packets, not projects.** If a packet spec doesn't fit in a
  few paragraphs, split it in `/boost-plan` first.
- **Review is cross-model by default.** Sonnet-built code is checked by
  Opus. If you (Fable) wrote code directly, still send it to Opus — the
  independence is the point, not a hierarchy.
- **Model unavailable → degrade gracefully.** If a role's model can't be
  spawned (quota, availability), fall back to the session model for that
  role and say so in the final report; never silently skip the phase.
- **Escalate on churn.** If a Sonnet builder fails the same packet twice,
  take the packet back and implement it yourself (Fable) — that is the
  cheap version of "same failure twice → change approach".

## When NOT to use

- Session model is Opus 4.8 or Sonnet 5 (profiles `opus`/`sonnet`): those
  run single-model BOOST; spawning other models would break the
  standalone-model premise those profiles exist for.
- T0/T1 tasks: too small to amortize delegation overhead — do them inline.
