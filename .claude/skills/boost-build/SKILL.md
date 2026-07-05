---
name: boost-build
description: >-
  BOOST implementation protocol — execute a plan as small verified work
  packets with mandatory checkpoints, test-first where behavioral, and
  drift-prevention on long tasks. Use after /boost-plan for any T2/T3
  implementation. Not for trivial (T0/T1) edits.
---

# BOOST Build

Frontier models hold a long implementation in their head; a standalone model
loses the thread. This protocol replaces "hold it in your head" with a
written plan, small packets, and forced checkpoints. Read
`.claude/boost.config.json` first; parameters refer to the active profile.

## Rules of the loop

1. **One packet at a time.** Take the next packet from the plan file, do it,
   then immediately run its **verification** (defined in the plan). Do not
   start the next packet on an unverified one.
2. **Checkpoint cadence.** Never exceed `maxUnverifiedSteps` consecutive
   edit steps without a checkpoint: run the relevant tests / execute the
   touched code path, and skim your own diff (`git diff`) for anything you
   don't remember intending. (`sonnet` profile: that means verify after
   *every* step.)
3. **Test-first when behavioral.** If a packet changes observable behavior
   and the repo has a test setup, write the failing test first. A
   failing-then-passing test is the strongest evidence this framework has.
4. **Update the plan file** after each packet: check it off, note surprises,
   record decisions made on the fly. Every few packets, re-read the
   requirements section — drift from the original ask is the failure mode
   this exists to catch.
5. **On failure, stop patching.** One honest retry is fine. The same failure
   twice means your model of the problem is wrong → switch to
   `/boost-debug`; do not iterate blindly.
6. **Scope discipline.** No refactors or "while I'm here" improvements
   outside the packet. Note them in the plan file's follow-ups section
   instead.
7. **Delegate bulk work.** Mechanical multi-file changes (renames, call-site
   updates) go to `boost-builder` agents — give each an exact packet spec
   including its verification command, and spot-check the results yourself.

## Exiting

All packets checked off and verified individually is **not** done. Hand off
to `/boost-review` (adversarial review), then `/boost-verify` (end-to-end
evidence gate). Only after both may you report completion.
