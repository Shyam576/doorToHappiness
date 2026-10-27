# Three.js Hero Section — Design

**Date:** 2026-10-27
**Status:** Approved, pending implementation plan

## Problem

The homepage hero (`src/pages/index.tsx:399-423`) is a 3-image crossfade slideshow (Tiger's Nest, festival dancers, Himalayan trek) with a scroll-parallax effect. The goal is to make the homepage feel more interactive and inviting by replacing it with an interactive 3D scene, without regressing SEO/LCP, accessibility, or mobile performance.

## Decision Summary

- 3D scene **replaces** the photo crossfade entirely (not a background layer, not a small focal object).
- Scene depicts a **stylized, low-poly Tiger's Nest (Paro Taktsang)** — cliff + temple cluster — built procedurally from primitive three.js geometry directly in code. Not a sourced/licensed/photoreal model.
- Interactivity: **ambient animation + mouse/scroll-reactive camera** (subtle tilt/pan on pointer and scroll position). No drag-to-orbit — avoids competing with the CTA buttons and search widget for input.
- Fallback: **static image** (the existing Tiger's Nest photo) for `prefers-reduced-motion`, no WebGL, or `navigator.connection.saveData` — full replacement of the 3D layer, not a degraded 3D scene.
- Integration: **`@react-three/fiber` + `@react-three/drei`**, loaded via Next.js `dynamic(..., { ssr: false })`.

## Architecture & Components

New directory: `src/components/hero3d/`

- **`TigersNestHero.tsx`** — top-level component. Owns the fallback decision and renders either the static image or the 3D canvas. Wraps the canvas in a React error boundary.
- **`HeroCanvas.tsx`** — the `@react-three/fiber` `<Canvas>`: lighting, fog/mist, camera rig, `dpr={[1, 1.5]}` cap.
- **`TigersNestModel.tsx`** — procedural low-poly geometry: extruded/displaced cliff face, temple cluster (boxes + cone/pyramid roofs) on a ledge. Built once via `useMemo`.
- **`useReactiveCamera.ts`** — hook driving camera tilt/pan from pointer position (`useFrame`/`state.pointer`) and scroll position (ref-based listener, mirroring the existing `heroParallaxRef` pattern in `index.tsx` — mutate a ref, never trigger React re-renders).

### Integration in `index.tsx`

`TigersNestHero` replaces the `heroSlides.map(...)` block (`index.tsx:401-423`). Loaded via `dynamic(() => import('../components/hero3d/TigersNestHero'), { ssr: false })`. The first hero photo (`/homepagebg1.jpg`) remains in the DOM as the `dynamic()` loading placeholder and the fallback render — it stays the LCP element and first paint; the 3D canvas crossfades in on top only once it signals ready (`onCreated`).

Dead code removed: `heroSlides` array entries for slides 2–3, `currentSlide` state, the slide-rotation `setInterval`, and the old `heroParallaxRef` scroll-transform effect (superseded by `useReactiveCamera`).

Untouched: `HeroHeading`, CTA buttons, search widget — all remain real DOM, rendered on top of the canvas exactly as today.

## Fallback, Performance & Accessibility

**Fallback detection** (`TigersNestHero.tsx`, client-side only via `useEffect`; defaults to *not* rendering 3D until confirmed safe, so SSR/hydration never flashes a canvas):
1. `window.matchMedia('(prefers-reduced-motion: reduce)').matches` → static image.
2. WebGL context probe (`canvas.getContext('webgl')` fails/null) → static image.
3. `navigator.connection?.saveData === true` → static image.
4. Otherwise → mount `HeroCanvas`, crossfade in over the static image on first successful frame.

**Performance guardrails:**
- `dpr={[1, 1.5]}` cap, not full device pixel ratio.
- Geometry is low-poly by construction (low hundreds of triangles), flat/gradient materials only — no textures, no separate mobile/desktop LOD needed.
- All reactive camera state lives in refs read inside `useFrame`; no per-frame React re-renders.
- `three` / `@react-three/fiber` / `@react-three/drei` only enter the bundle via the `ssr:false` dynamic import on the homepage — zero cost elsewhere.

**Accessibility:**
- `<canvas>` gets `aria-hidden="true"` and `tabIndex={-1}`.
- Static fallback keeps the existing meaningful `alt` text.
- Text overlay and interactive controls are unaffected — same DOM structure as today, drawn on top of the canvas, not into it.

## Error Handling

`TigersNestHero` wraps `HeroCanvas` in a React error boundary. Any mount-time failure (driver issue, context loss, etc.) falls back to the static image — a decorative enhancement must never surface as a user-facing error or blank hero.

## Dependencies

New: `three`, `@react-three/fiber`, `@react-three/drei`. Justification: no existing utility in this codebase covers WebGL rendering; these are the standard, actively-maintained React + three.js bindings and are compatible with the project's React 18.

## Testing

- Unit tests (Jest) for the fallback-decision logic: `prefers-reduced-motion`, WebGL-probe failure, `saveData` — this is plain, mockable logic and is the part that actually carries user-facing risk.
- Smoke test that `TigersNestHero` renders the static-image path without crashing when 3D is force-disabled.
- **Not** unit-tested: the actual WebGL scene (`HeroCanvas`/`TigersNestModel`) — jsdom has no WebGL. Verified manually in a real browser against a local dev server before calling the work done.

## Risks / Trade-offs

- The model will read as stylized/low-poly, not photoreal — already confirmed as the intended look.
- Cold-cache visitors pay a JS download for three.js/fiber/drei before the 3D layer appears; mitigated by the static image remaining visible as the loading state.
- Self-contained to the homepage hero — no other pages or shared components are touched.

## Out of Scope

- Any 3D treatment on other pages/sections (tours, packages, etc.).
- A licensed/photoreal Tiger's Nest model (would be a future follow-up if the stylized version doesn't land well).
- Drag-to-orbit or other heavier interaction models.
