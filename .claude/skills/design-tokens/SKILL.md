---
name: design-tokens
description: >-
  Establish and enforce a single source of truth for visual design values
  (color, typography, spacing, radius, shadow, motion) and wire them to light/dark
  themes. Use when setting up theming, implementing a ui-ux-pro-max design system
  in code, adding dark mode, or whenever you see hardcoded colors / fonts / pixel
  spacing that should be tokens. Detects and matches the project's styling stack.
  Do NOT use for backend or non-visual work.
---

# Design Tokens

The bridge between design and code. `ui-ux-pro-max` produces a palette, type
scale, and spacing system; this skill turns that into **named tokens** the whole
codebase references, so the design stays consistent and dark mode is a token
swap, not a rewrite.

## When to use
Setting up or refactoring theming/colors/typography/spacing, implementing a
design system, adding light/dark mode, or cleaning up hardcoded visual values.

## Core rule
**No hardcoded visual values in components.** Colors, fonts, spacing, radii,
shadows, and durations all come from tokens. A raw `#3b82f6`, `16px`, or
`font-family: Inter` in a component is a bug this skill fixes.

## Token categories (define all that apply)
- **Color** — define *primitive* colors (the raw palette from ui-ux-pro-max),
  then *semantic* tokens that reference them: `bg`, `surface`, `text`,
  `text-muted`, `border`, `primary`, `danger`, `success`, `focus`. Components use
  the **semantic** tokens only.
- **Typography** — font families, a type scale (size + line-height pairs),
  weights.
- **Spacing** — one scale (e.g. 4/8-based); use steps, never arbitrary px.
- **Radius**, **shadow/elevation**, **motion** (durations + easing), **z-index**.

## Light / dark
Define semantic tokens once; provide light and dark **value sets**. Swapping the
theme reassigns token values — component code never branches on theme. Verify
**WCAG AA contrast in both modes** (this is also in the design-to-code checklist).

## Match the stack (detect first)
- **CSS / vanilla**: CSS custom properties on `:root` + `[data-theme="dark"]`.
- **Tailwind**: define tokens in `theme.extend` (and/or CSS vars referenced by
  Tailwind); use semantic class names, not arbitrary values like `bg-[#fff]`.
- **CSS-in-JS / shadcn**: a theme object / CSS-var layer consumed by components.
- **React Native**: a typed theme object provided via context; no inline hex.
Follow whatever the project already uses; don't introduce a new system unprompted.

## Workflow
1. Pull the palette / type / spacing from `ui-ux-pro-max`.
2. Define primitive + semantic tokens for light and dark.
3. Replace hardcoded values in components with semantic tokens.
4. Confirm contrast (AA) in both modes and that nothing regressed.

## Checklist
- [ ] Semantic tokens defined (not just raw colors) for light **and** dark
- [ ] Components reference semantic tokens only — zero hardcoded hex/px/font
- [ ] Type, spacing, radius, shadow, motion all tokenized
- [ ] AA contrast verified in light and dark
- [ ] Tokens live in one place and are documented/named consistently
