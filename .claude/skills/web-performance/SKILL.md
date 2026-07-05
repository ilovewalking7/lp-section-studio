---
name: web-performance
description: >-
  Verification- and optimization-focused frontend performance work. Use when
  asked to "improve performance", "speed it up", "optimize load time", "reduce
  bundle size", "fix LCP/CLS/INP", or as a pre-ship performance gate. Measures
  Core Web Vitals first, then applies high-yield fixes (images, fonts, JS
  splitting, layout stability, caching) and re-measures. Detects the project's
  stack/build tooling. Do NOT use for backend/server performance.
---

# Web Performance

The performance counterpart to `accessibility-audit`: measure the built UI, find
what's slow, fix it, re-measure. `ui-ux-pro-max` flags performance at design
time; this skill verifies and optimizes the real result.

## When to use
Improving load/runtime performance of a built UI, hitting a perf budget, or a
pre-ship gate. Not for backend latency or data-pipeline tuning.

## Measure first (don't guess)
Detect existing tooling; if none, prefer these:
- **Lab**: Lighthouse / `web-vitals` lib / the framework's build analyzer.
- **Bundle**: the build tool's analyzer (rollup-plugin-visualizer, `next build`
  output, `vite build` report) to find the heaviest modules.
- Profile with DevTools Performance/Network for runtime jank.

## Targets (Core Web Vitals, "good" thresholds)
- **LCP** ≤ 2.5s — largest content paints fast.
- **INP** ≤ 200ms — interactions feel responsive.
- **CLS** ≤ 0.1 — layout doesn't jump.
Plus: keep the initial JS payload small and TTFB low.

## High-yield optimizations
1. **Images** (usually the biggest win): modern formats (AVIF/WebP), correctly
   sized + `srcset`, lazy-load below the fold, eager-load the LCP image, always
   set width/height (prevents CLS).
2. **Fonts**: `font-display: swap`, preload the critical font, subset, limit
   weights; avoid layout shift from late font swaps.
3. **JavaScript**: code-split by route, lazy-load heavy/below-the-fold components,
   tree-shake, drop unused deps, defer non-critical scripts. Ship less JS.
4. **Layout stability (CLS)**: reserve space for images/ads/embeds; avoid
   inserting content above existing content; use transforms for animation.
5. **Network/caching**: cache static assets with long TTL + hashing, compress
   (brotli/gzip), preconnect to critical origins, avoid waterfalls.
6. **Rendering**: prefer SSR/SSG/streaming where the stack supports it; memoize
   genuinely expensive renders (don't over-memoize).

## Set a budget
Agree on limits (e.g. initial JS < 170KB gzip, LCP < 2.5s) and, where possible,
enforce them in CI (Lighthouse CI / bundlesize) so regressions are caught — pairs
with `frontend-testing`.

## Verify
Re-measure after changes and confirm the metric actually moved; run **`/verify`**
to observe the real app. Report before/after numbers.

## Anti-patterns
- Optimizing without measuring (premature/blind tweaks).
- Shipping unoptimized hero images or huge JS for a simple page.
- Over-memoizing trivial components (adds complexity, no win).
- Lazy-loading the LCP element (delays the metric you're trying to improve).
