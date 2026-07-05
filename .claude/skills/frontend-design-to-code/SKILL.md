---
name: frontend-design-to-code
description: >-
  End-to-end pipeline for building or redesigning polished web/mobile UI in this
  repo. Use whenever a task involves creating or reworking a UI, screen, page,
  layout, flow, or component (e.g. "design a dashboard", "build a landing page",
  "make this form prettier", "add a settings screen"). It chains the existing
  ui-ux-pro-max design skill, the bundled Component Studio (880 reusable
  components in src/registry/), implementation, and accessibility/responsive
  verification into one repeatable flow so the design-heavy tools that are
  already configured actually get used in the right order. Do NOT use for pure
  backend/CLI/data tasks with no UI.
---

# Frontend Design-to-Code

This repo is set up for UI work (the `ui-ux-pro-max` design skill + the bundled
**Component Studio** — 880 production-grade React components in `src/registry/` —
are both available), but those tools only pay off when they are used together,
in order. This skill is that glue: a fixed pipeline from "requirements" to
"verified, shippable UI".

## When to use
Any task that produces or changes a user-facing interface — a screen, page,
layout, component, flow, or visual restyle. Skip it for backend, CLI, scripting,
or data-only work.

## The pipeline

Run the phases in order. Don't skip phase 1 — the design system is what keeps
everything below consistent.

### 1. Frame the requirements
Extract, in one or two lines: **product type**, **audience**, **platform**
(web / mobile / both), **style keywords**, and any hard constraints (brand
colors, dark mode, existing design system, framework). If the user was vague on
style, propose a sensible default and say so — don't stall.

### 2. Derive the design system — use `ui-ux-pro-max`
Invoke the **`ui-ux-pro-max`** skill to get a concrete design system: color
palette (with semantic tokens), font pairing, spacing/elevation scale, and the
UX rules that apply to this product type. Treat its output as the single source
of truth for the rest of the build. Record the chosen tokens so every component
references them instead of hardcoded values.

### 3. Reuse components — use the bundled Component Studio
Before hand-rolling anything, check whether one of the 880 self-contained
components in `src/registry/` already fits (this repo is the free, owned
replacement for the 21st.dev Magic MCP — no API key, no subscription):
- **Search the index** `src/registry/manifest.ts` by `category` / `tags` /
  `name` / `description` (e.g. pricing table → category「価格・オファー」or tag
  `pricing`). Fast path: `rg -i "pricing|料金" src/registry/manifest.ts`.
- **Read the source** at the entry's `path` → `src/registry/demos/<...>.tsx`,
  then copy or adapt it. Each demo is self-contained (`react` / `lucide-react` /
  `cn` / `@/components/ui/*` only), so it ports cleanly. Feed the phase-2 tokens
  in as you adapt so the look matches.
- **Preview** with `npm run dev` to browse categories, live-preview, and copy
  source, or pull a single component into another project via
  `npx shadcn@latest add <registry-base>/r/<id>.json` (see `docs/USE-IN-OTHER-REPOS.md`).
- Only hand-write from scratch when nothing in the registry is close — and then
  add it back into `src/registry/demos/` so the library keeps growing.

### 4. Implement
Wire the generated/handwritten components into the actual stack. **Detect the
project's framework and conventions first** (look for `package.json`,
existing components, styling approach) and match them — do not introduce a new
framework or styling system unprompted. Bind everything to the design tokens
from phase 2; no hardcoded colors, fonts, or magic-number spacing.

### 5. Verify before declaring done
- **Responsive**: check the layout at mobile, tablet, and desktop widths; respect
  safe areas and avoid layout shift.
- **Accessibility**: text contrast meets WCAG AA in both light and dark mode,
  interactive targets are large enough, focus is visible, controls are
  keyboard-reachable and labeled.
- Run **`/verify`** to actually launch and observe the UI (not just trust the
  diff), and **`/code-review`** on the change.

## Delivery checklist
- [ ] Visual matches the phase-2 design system (palette, type, spacing)
- [ ] All colors/fonts/spacing come from tokens, not hardcoded values
- [ ] Works at mobile / tablet / desktop; no horizontal scroll or CLS
- [ ] WCAG AA contrast in light **and** dark mode
- [ ] Keyboard navigable, visible focus, labeled controls
- [ ] Loading / empty / error states handled
- [ ] Verified by actually running it (`/verify`)

## Anti-patterns to avoid
- Jumping straight to code and skipping the design system (phase 1–2).
- Emoji used as UI icons; inconsistent spacing; hardcoded hex colors.
- Interactions that shift layout; missing hover/active/focus/disabled states.
- Introducing a new UI framework or CSS approach that the project doesn't use.
