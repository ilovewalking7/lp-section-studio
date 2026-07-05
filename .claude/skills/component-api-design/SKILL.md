---
name: component-api-design
description: >-
  Design reusable, composable UI component APIs — props, composition, controlled
  vs uncontrolled, variants, slots, naming, and accessibility-by-default. Use when
  building or refactoring shared/reusable components, designing a component
  library, reviewing a component's API, or right after generating a component
  (e.g. via the Magic MCP) to make it production-grade. Detects the project's
  framework. Do NOT use for backend or one-off non-reusable markup.
---

# Component API Design

Generating a component (e.g. with the `magic` MCP) gets you markup; this skill
makes it a well-designed, reusable building block. Pairs with `design-tokens`
(visual values) and `accessibility-audit` (a11y is part of a good API, not an
afterthought).

## When to use
Designing or refactoring components meant to be reused: library/design-system
components, shared UI, or hardening a freshly generated component. Skip for
throwaway, page-specific markup.

## Principles
1. **Composition over configuration** — prefer composable parts
   (`<Select><Select.Option/></Select>`) and `children`/slots over an
   ever-growing prop list or boolean soup.
2. **Sensible defaults, minimal surface** — the common case needs almost no
   props; expose only what callers genuinely vary. Every prop is a maintenance
   cost.
3. **Controlled *and* uncontrolled** — support both: `value`/`onChange` for
   controlled, `defaultValue` for uncontrolled. Don't force state ownership.
4. **Don't swallow the platform** — forward `ref`, spread remaining props to the
   root element, keep native events working (`onClick`, `aria-*`, `className`/
   `style` for escape hatches).
5. **Variants via tokens** — express look (`variant`, `size`, `tone`) as a small
   enum mapped to `design-tokens`, never hardcoded styles. Avoid one boolean per
   visual state.
6. **Accessibility by default** — correct roles/labels/keyboard behavior built in
   so callers can't easily make it inaccessible. Use native elements first.
7. **Predictable naming** — boolean props read as state (`disabled`, `isLoading`,
   not `enabled=false`); event props are `onX`; mirror platform/library
   conventions already in the codebase.

## State & data
- Keep components presentational where possible; lift data fetching/business
  logic out (pass data + callbacks in).
- One source of truth per piece of state; document who owns it.

## Polymorphism (use sparingly)
When a component must render as different elements, prefer the project's existing
pattern (`asChild`/Slot, or an `as`/`component` prop) rather than inventing one.

## Checklist
- [ ] Common case works with minimal/zero props (good defaults)
- [ ] Composable (children/slots) instead of a giant prop list
- [ ] Controlled + uncontrolled both supported where stateful
- [ ] `ref` forwarded; extra props/`className`/`style` reach the root
- [ ] Variants/sizes map to design tokens (no hardcoded styles)
- [ ] Accessible by default (roles, labels, keyboard)
- [ ] Loading / empty / error / disabled states handled
- [ ] Names follow existing codebase conventions

## Anti-patterns
- Boolean explosion (`isPrimary`, `isSecondary`, `isDanger` → use `variant`).
- Prop-drilling everything instead of composition.
- Hardcoded colors/spacing instead of tokens.
- Re-implementing native elements (custom `<div>` buttons) and losing a11y.
- Leaking internal state so callers can't control the component.
