---
name: frontend-testing
description: >-
  Conventions for testing UI/frontend code built in this repo. Use when writing,
  adding, or improving tests for components, pages, hooks, or user flows — e.g.
  "add tests", "test this component", "set up a test suite", "cover this flow".
  It detects the project's existing stack and matches it, focuses tests on
  behavior and accessibility (not implementation details), and ties into the
  /verify flow. Do NOT use for backend-only, CLI, or pure-data testing with no UI.
---

# Frontend Testing

Pairs with `frontend-design-to-code`: that skill builds the UI, this one proves
it works and keeps it working. Tests should give confidence a real user can use
the feature — not lock in implementation details.

## When to use
Writing or extending tests for anything user-facing: components, pages, hooks,
state, or end-to-end flows. Skip for backend/CLI/data-only work.

## First: detect the stack, don't impose one
Before writing tests, look at `package.json` and existing test files and **match
what's there**. Only introduce a tool if none exists, and prefer the ecosystem
default:
- **Component/unit**: Vitest or Jest **+ Testing Library** (React/Vue/Svelte) — query by
  role/label/text, interact like a user, assert on what the user sees.
- **End-to-end**: Playwright (preferred) or Cypress for real-browser flows.
- **React Native**: Jest + React Native Testing Library; Maestro/Detox for e2e.
Never add a second framework alongside an existing one.

## What to test (the priorities)
1. **Behavior over markup** — assert what the user perceives (visible text,
   enabled/disabled, navigation), not internal state or class names.
2. **The states that break in production** — loading, empty, error, and success;
   not just the happy path.
3. **Accessibility** — elements are reachable by role/label, focus moves
   correctly, the keyboard path works. Catch a11y regressions in tests, not just
   by eye.
4. **Critical user flows** — cover the few end-to-end journeys that matter
   (sign-in, checkout, the primary task) with e2e, the rest with component tests.
5. **Edge cases & regressions** — every bug fix gets a test that fails before the
   fix and passes after.

## Conventions
- Co-locate tests with the code (`Button.test.tsx` next to `Button.tsx`) unless
  the project already centralizes them — follow the existing pattern.
- One behavior per test; name tests by behavior ("disables submit while
  pending"), not by method.
- Prefer real interactions (`userEvent`) over firing synthetic events.
- Mock the network boundary (e.g. MSW) rather than internal modules.
- Keep e2e tests few, deterministic, and independent (no shared order).

## Running & verifying
- Run the project's test command (`npm test` / `pnpm test` / `vitest`), and the
  e2e command separately.
- After tests pass, still run **`/verify`** to launch and observe the real UI —
  green tests are necessary, not sufficient.

## Anti-patterns
- Snapshot-testing everything (brittle, asserts nothing meaningful).
- Querying by CSS class or test-id when a role/label query works.
- Testing library internals or implementation details.
- Flaky e2e from real network calls or fixed `sleep()` waits — wait on state.
