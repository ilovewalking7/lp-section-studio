---
name: i18n
description: >-
  Internationalization and localization patterns — externalizing user-facing
  copy, message catalogs and keys, pluralization, interpolation, locale-aware
  dates/numbers/currency, language switching, RTL, and lazy-loading locales. Use
  when adding multi-language support, externalizing hardcoded strings, formatting
  dates/numbers per locale, or setting up an i18n library (e.g. for Japanese +
  English). Detects the project's stack. Do NOT use for backend-only work.
---

# Internationalization (i18n)

Make the UI translatable and locale-correct without rewriting it later. Core
rule: **no hardcoded user-facing strings, no hardcoded date/number formats.**

## When to use
Adding languages, externalizing hardcoded copy, formatting dates/numbers/currency
per locale, adding a language switcher, or supporting RTL.

## Set up (match the stack)
Detect any existing i18n lib; if none, prefer the ecosystem default:
**react-i18next** or **next-intl** (React/Next), **vue-i18n** (Vue),
**svelte-i18n**, or **FormatJS/Intl** primitives. Use **ICU MessageFormat** for
plurals/select/interpolation.

## Message catalogs & keys
- Every visible string comes from a catalog (`t('cart.empty')`), never inline.
- Use **stable, namespaced keys** (`checkout.button.pay`), one convention,
  consistently. Keep a default-locale catalog as the source of truth.
- **Interpolate, never concatenate**: `t('greeting', { name })` →
  `"こんにちは、{name}さん"`. Concatenating fragments breaks grammar/order across
  languages.

## Plurals, gender, formatting
- **Plurals via ICU** (`{count, plural, one {# item} other {# items}}`), never
  manual `if (n === 1)` — rules differ per language (Japanese has no plural; some
  languages have many forms).
- **Dates/numbers/currency via `Intl`** (`Intl.DateTimeFormat`,
  `NumberFormat`, `RelativeTimeFormat`) with the active locale — never hardcode
  `MM/DD/YYYY` or a currency symbol.

## Locale handling
- Detect (navigator/Accept-Language/URL), let the user override, persist the
  choice, and define a **fallback** locale.
- **Lazy-load** locale catalogs so you don't ship every language in the main
  bundle (pairs with `web-performance`).
- Consider locale in the **URL** (`/ja/...`, `/en/...`) for SSR/SEO when relevant.

## Layout, RTL & a11y
- Allow **text expansion** (translations can be ~30% longer) — don't fix widths
  or truncate labels; avoid text baked into images.
- Support **RTL**: use CSS logical properties (`margin-inline-start`, not
  `margin-left`) and set `dir`. Pairs with `design-tokens`.
- Set the document/element **`lang`** attribute per locale (accessibility + SR).

## Anti-patterns
- Concatenating translated fragments or embedding variables via string addition.
- Hardcoded date/number/currency formats.
- Using a flag to represent a *language* (flags are countries, not languages).
- Assuming English text length; truncating translated UI.
- Manual plural logic instead of ICU.

## Checklist
- [ ] No hardcoded user-facing strings — all via catalog keys
- [ ] ICU plurals; interpolation (not concatenation)
- [ ] Dates/numbers/currency via `Intl` + active locale
- [ ] Locale detection, override, persistence, and fallback
- [ ] Catalogs lazy-loaded per locale
- [ ] Layout tolerates text expansion; RTL via logical properties; `lang` set
