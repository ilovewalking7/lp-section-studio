---
name: boost-debug
description: >-
  BOOST debugging protocol — reproduce first, enumerate competing hypotheses,
  run discriminating experiments, prove the root cause, then fix with a
  regression test. Use for any nontrivial bug, failing test, or unexplained
  behavior — and always after the same fix attempt has failed twice. Not for
  obvious typo-level fixes.
---

# BOOST Debug

The sub-frontier debugging failure mode is fix-guessing: patch the first
plausible cause, observe the symptom again, patch the next guess. This
protocol replaces guessing with hypothesis elimination. Read
`.claude/boost.config.json` first; parameters refer to the active profile.

## 1. Reproduce before theorizing

Get the failure to happen on demand — a command or test you can re-run,
reduced as far as cheaply possible. **No reproduction, no fix**: if you
cannot reproduce, that becomes the task (add logging, capture state,
reconstruct inputs). The reproduction is also your fix-verification later.

## 2. Hypotheses — at least 3, different layers

Write down ≥3 hypotheses that would each fully explain the observation,
deliberately spread across layers (your code / its inputs / library or API
misuse / configuration or environment / concurrency or timing). Rank by
prior probability. One hypothesis is a guess; a ranked set is a search.

## 3. Discriminating experiments

For the top hypotheses, design the cheapest observation that *distinguishes*
them (a log line, a probe test, a bisect, an isolated call) — prefer
experiments that split the space, not ones that confirm your favorite.
Independent experiments can run as parallel `boost-verifier` agents, each
handed one hypothesis to attack. Eliminate until one hypothesis survives
contact with the evidence.

## 4. Prove the mechanism

Before fixing, state the full causal chain — trigger → mechanism → observed
symptom — with `file:line` for each link. "The fix made the symptom vanish"
is not proof; symptoms also vanish when you mask them. If you cannot narrate
the chain, you have not found the root cause yet.

## 5. Fix + regression test

- Fix the cause, not the symptom, at the right layer.
- Add a regression test that fails on the pre-fix code and passes on the
  post-fix code — actually observe both states (this is the profile-neutral
  strongest evidence; do not skip it where a test setup exists).
- Re-run the original reproduction from §1: green.
- **Same-class scan**: grep for the same bug pattern elsewhere in the repo;
  report (or fix, if in scope) other instances.

## 6. Exit through the gates

The fix is a T2 change: `/boost-review` on the diff, then `/boost-verify`.
In the final report include the causal chain and the evidence, not just the
diff.
