---
name: state-management
description: >-
  Patterns for managing frontend state — distinguishing local UI state, shared
  client state, and server/remote state (data fetching, caching, mutations). Use
  when adding data fetching, wiring up global/app state, deciding where state
  should live, fixing prop-drilling or stale/duplicated state, or choosing a
  state library. Detects the project's framework and existing libraries. Do NOT
  use for backend/server state machines.
---

# State Management

Most "state management" pain comes from one mistake: **treating server data as
client state**. Get the categories right first; the library choice is secondary.

## When to use
Adding data fetching, setting up app/global state, deciding where a piece of
state belongs, or untangling prop-drilling, stale data, or duplicated state.

## The key distinction
- **Server state** — data owned by the backend (fetched, cached, can go stale):
  lists, profiles, anything from an API. Needs caching, revalidation, loading/
  error handling — **use a data-fetching library**, don't hand-roll into a store.
- **Client state** — UI-only state the client owns: open/closed, selected tab,
  form draft, theme. Keep this minimal and local.
- **URL state** — sharable/bookmarkable state: filters, current page, tab. Put it
  in the URL (query/route), not a store.
- **Derived state** — computed from other state. **Compute it, don't store it**
  (memoize if expensive).

## Where should state live? (escalate only as needed)
1. **Local** (`useState`/component) — default; keep state as close to where it's
   used as possible.
2. **Lifted** to the nearest common parent — when siblings share it.
3. **Context** — for low-frequency, widely-read values (theme, auth, locale).
   Avoid putting fast-changing state in a single context (causes re-renders).
4. **Global store** — only for genuinely app-wide, cross-cutting client state.

## Server state
- Use the stack's data layer: **TanStack Query / SWR** (React), **Pinia
  Colada / vue-query** (Vue), **RTK Query**, or the framework's loaders
  (Next/Remix). Match what the project already uses.
- Stable **query keys**, explicit **invalidation** after mutations, handle
  **loading / error / empty** every time, consider **optimistic updates**.
- **Don't copy server data into a global client store** — let the cache be the
  source of truth.

## Client state
- Prefer local; reach for a library only when there's real shared client state.
- Pick by stack and keep it small: **Zustand / Jotai / Redux Toolkit** (React),
  **Pinia** (Vue), **stores/signals** (Svelte/Solid/Angular). Don't add a second
  one alongside an existing choice.

## Anti-patterns
- Putting everything in one global store "just in case".
- Mirroring server data into Redux/Zustand and manually syncing it.
- `useEffect` that copies props into state (derive or use the prop directly).
- Prop-drilling deep instead of composition/context.
- Storing derived values that drift out of sync with their source.

## Checklist
- [ ] Server vs client vs URL vs derived state correctly separated
- [ ] Server data goes through a caching data-layer, not a hand-rolled store
- [ ] State lives as locally as possible; global only when truly cross-cutting
- [ ] Loading / error / empty states handled for all remote data
- [ ] No duplicated/derived state that can drift; no new lib alongside an existing one
