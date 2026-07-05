---
name: accessibility-audit
description: >-
  Verification-focused accessibility (a11y) pass over ALREADY-BUILT UI. Use when
  asked to "audit/check accessibility", "is this accessible", "find a11y issues",
  "WCAG check", or as a gate before shipping a screen/component. Unlike the
  design-time guidance in ui-ux-pro-max, this skill inspects the rendered result,
  reports severity-ranked WCAG 2.2 AA findings with concrete fixes, and re-checks.
  Detects the project's stack/tooling. Do NOT use for backend or non-visual work.
---

# Accessibility Audit

The verification counterpart to the design skills: `ui-ux-pro-max` and
`design-tokens` tell you how to build it right; this skill proves the built UI
is actually accessible and fixes what isn't. Target standard: **WCAG 2.2 AA**.

## When to use
Auditing existing UI — a finished component, screen, or flow — or as a
pre-ship gate. Not for design-time decisions (use `ui-ux-pro-max`) or backend.

## How to run the audit
Combine automated and manual checks — automated tools catch ~30-50% of issues;
the rest need manual verification.
1. **Automated**: run an axe-core based check (`@axe-core/playwright`, `jest-axe`,
   `axe DevTools`, or Lighthouse a11y) against the rendered UI. Detect what the
   project already has; if nothing, prefer axe via the existing test runner.
2. **Keyboard**: Tab/Shift-Tab through everything — every interactive element is
   reachable, in a logical order, with a **visible focus** indicator, no traps,
   and Enter/Space/Esc behave as expected.
3. **Semantics / screen reader**: headings form a sensible outline, landmarks
   exist (`main`, `nav`…), controls have accessible names, images have alt text
   (empty alt for decorative), and dynamic updates use live regions.
4. **Visual**: text contrast ≥ 4.5:1 (3:1 for large text/UI components) in
   **both light and dark**; works at 200% zoom; not color-only signaling.

## What to check (WCAG 2.2 AA, the high-yield set)
- **Perceivable**: text alternatives, contrast, reflow at 320px, text spacing.
- **Operable**: full keyboard access, visible focus (2.4.7), focus not obscured
  (2.4.11), target size ≥ 24px (2.5.8), no keyboard traps, motion/`prefers-reduced-motion`.
- **Understandable**: labels & instructions, error identification + suggestions,
  consistent navigation, inputs have `name`/`label`/`autocomplete`.
- **Robust**: valid roles/states/properties, name-role-value for custom widgets,
  status messages announced.

## Output: a ranked report
Report findings as a list, each with **severity** (Critical / Serious / Moderate /
Minor), the **WCAG criterion**, the **location** (file/component/selector), and a
**concrete fix**. Lead with Critical/Serious (blockers). Then apply the fixes
(small, confident ones directly) and re-run the audit to confirm zero
Critical/Serious remain.

## Integrate
- Add the automated check to the test suite (pairs with `frontend-testing`) so
  regressions are caught in CI, not by eye.
- Run **`/verify`** to observe the fixed UI in the real app.

## Anti-patterns
- Trusting the automated scan alone (it misses keyboard/SR/context issues).
- "Fixing" by adding ARIA onto non-semantic markup instead of using the right
  native element (first rule of ARIA: don't use ARIA if HTML can do it).
- Removing focus outlines without a visible replacement.
- Positive `tabindex`, or `aria-hidden` on focusable elements.
