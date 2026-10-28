# Journey Architect Calculator — Design

**Date:** 2026-10-28
**Status:** Approved, pending implementation plan

## Problem

Trip planning today happens through `src/components/TripBuilderForm.tsx`, a 5-step static-question wizard on `/contactus` (travel month → trip length → interests → travel party → contact details) that collects preferences but gives the visitor no live sense of cost or route before they submit a lead. The goal is a new, self-contained interactive page where a visitor configures a trip (duration, travelers, traveler type) and sees a real-time cost estimate and route timeline update as they adjust inputs, then can hand off into the site's existing lead-capture flow.

This is one sub-project of a larger, decomposed request (see prior session: full hero/rebrand prompt was split into independent pieces — hero is already done; this is the "Journey Architect" piece only). Package-card redesign, FAQ/visa drawer, and any palette/rebrand work are explicitly out of scope here.

## Decision Summary

- New **standalone page** at `/plan-your-trip`, not a homepage section and not a replacement of the existing `/contactus` `TripBuilderForm` wizard — the two coexist as separate entry points.
- Inputs: duration slider (3–14 days), adult/child counts, traveler type (Solo/Couple/Family/Trekking Group).
- Live outputs: cost breakdown (SDF, accommodation, guide, transit, total) and a day-by-day route timeline, both recomputed on every input change via pure functions (no debounce needed — calculations are cheap, synchronous arithmetic over small arrays).
- Pricing figures are **clearly-labeled placeholder constants** in a dedicated config file — real Bhutan SDF/accommodation/guide/transit rates were not provided and must not be guessed; the config file is structured so swapping in real numbers later is a one-file edit.
- "Lock in this Itinerary" opens a confirmation drawer and, on submit, **reuses the existing `/api/contact` lead-capture flow** (same pattern as `TripBuilderForm`'s `source: 'trip-builder'`), rather than a new endpoint or an external integration.
- Visual design reuses the **existing amber/forest/cream Tailwind design system** and `react-icons/fi` icon set already used across the site — no new color tokens, no new UI/animation libraries (no Framer Motion, no Lucide React). `@headlessui/react` (already a dependency, currently unused anywhere in the codebase) is used for the drawer.

## Architecture & Components

New directory: `src/components/journeyArchitect/` (mirrors the existing `src/components/invoice/` feature-subfolder pattern).

- **`JourneyArchitect.tsx`** — top-level client component rendered by the page. Owns all calculator state via local `useState` (duration, adults, children, travelerType, drawer-open flag). No Formik/Redux: both existing complex forms in this codebase (`TripBuilderForm`, `InvoiceForm`) use local state despite Formik/Yup being installed dependencies, so this follows that established precedent rather than introducing a third pattern.
- **`DurationSlider.tsx`** — a 3–14 day range control. No slider component exists anywhere in the codebase today (confirmed by search) — built from a native `<input type="range">` styled with Tailwind to match the site's existing amber accent, not a new dependency.
- **`TravelerSelector.tsx`** — adult/child numeric steppers plus a traveler-type pill group, reusing `TripBuilderForm`'s existing `<button role="radio">`/`<button role="checkbox">` pill-grid visual pattern (`TRIP_LENGTH_OPTIONS`-style rendering) for visual consistency with the one other multi-choice selector already in the app.
- **`RouteTimeline.tsx`** — renders the day-by-day stops returned by `getRouteForDuration()`, reusing the numbered-circle vertical timeline visual pattern already implemented in `src/pages/package/trekking/[id].tsx` (~lines 365-395) for `detailed_itinerary`.
- **`CostBreakdown.tsx`** — renders the `CostBreakdown` object returned by `calculateCost()` as line items (SDF, accommodation, guide, transit) plus a total, visually modeled on the controls/preview split already used in `src/components/invoice/InvoiceForm.tsx` + `InvoicePreview.tsx`.
- **`LockInDrawer.tsx`** — confirmation step built on `@headlessui/react`'s `Dialog`/`Transition` primitives (already an installed, currently-unused dependency — see Dependencies). Pre-filled with the calculator's current summary plus the same contact fields `TripBuilderForm` collects (name, email, phone). Responsive: centered modal ≥768px, bottom-sheet (fixed to viewport bottom, rounded top corners, slide-up) on mobile via Tailwind breakpoint classes — no separate mobile component.

Supporting, non-component files:

- **`src/lib/calculator-utils.ts`** — pure, UI-independent logic:
  - `calculateCost(input: CalculatorInput): CostBreakdown`
  - `getRouteForDuration(days: number): RouteStop[]`
  - Shared types: `TravelerType`, `CalculatorInput`, `CostBreakdown`, `RouteStop`.
- **`src/data/journeyArchitectRates.ts`** — placeholder rate constants and curated route templates (see Data Model below). Every rate constant carries a comment marking it as a placeholder pending real figures.

### Integration

- New page file `src/pages/plan-your-trip/index.tsx` renders `<JourneyArchitect />` inside the existing `Container`/`NavBar`/`Footer` page chrome (matching how other top-level pages like `/contactus` are structured). No changes to `index.tsx` (homepage) or any other existing page.
- No `next/dynamic`/`ssr: false` needed here — unlike the WebGL hero, this component has no browser-only APIs and benefits from normal SSR (faster first paint, no loading-state flash).

## Data Model

```ts
type TravelerType = 'solo' | 'couple' | 'family' | 'trekking-group'

interface CalculatorInput {
  durationDays: number        // 3-14
  adults: number
  children: number
  travelerType: TravelerType
}

interface CostLineItem {
  label: string
  amountUsd: number
}

interface CostBreakdown {
  sdf: CostLineItem
  accommodation: CostLineItem
  guide: CostLineItem
  transit: CostLineItem
  totalUsd: number
}

interface RouteStop {
  day: number
  location: string
  description: string
}
```

`journeyArchitectRates.ts` holds:
- `SDF_PER_ADULT_PER_NIGHT_USD`, `SDF_PER_CHILD_PER_NIGHT_USD` (placeholder values, e.g. modeled loosely on publicly known SDF structure but explicitly commented `// PLACEHOLDER — replace with current official rate`).
- `ACCOMMODATION_PER_NIGHT_USD` by `TravelerType` (family/group get a lower per-person blended rate than solo/couple, as a simple placeholder tiering).
- `GUIDE_PER_DAY_USD`, `TRANSIT_PER_DAY_USD` flat rates.
- `ROUTE_TEMPLATES: { minDays: number; maxDays: number; stops: RouteStop[] }[]` — 4 curated buckets (e.g. 3–4 days: Paro–Thimphu; 5–7: + Punakha; 8–10: + Phobjikha; 11–14: + Bumthang/Trashigang), with stop names drawn from the existing `src/data/destinations.json` so the route reads as real Bhutanese geography rather than invented placeholder names. `getRouteForDuration()` picks the bucket containing `durationDays` and distributes `durationDays` across that bucket's stops.

This data model is intentionally decoupled from the `src/data/*.json` package listings (`majorCitiesPackage.json` etc.) — the calculator produces an *estimate and illustrative route*, not a booking against a specific existing package, so it doesn't need to read or depend on that data.

## Submit Flow

1. User clicks "Lock in this Itinerary" → `LockInDrawer` opens, pre-filled with the current `CalculatorInput` + computed `CostBreakdown`, plus empty name/email/phone fields.
2. On submit, `axios.post('/api/contact', {...})` with payload:
   ```ts
   {
     name, email, phone,                          // from the drawer's contact fields
     message: '',                                  // not collected here, matches trip-builder's shape
     source: 'journey-architect',
     durationDays, adults, children, travelerType,  // from CalculatorInput
     estimatedCostUsd: breakdown.totalUsd,
     routeSummary: routeStops.map(s => s.location).join(' → '),
   }
   ```
3. `src/models/contact.ts` gets these fields added as optional schema fields, the same way `travelMonth`/`tripLength`/`interests`/`travelParty` were added for `source: 'trip-builder'` — no new Mongoose model, no new API route.
4. On success, the drawer shows a confirmation state (mirroring `TripBuilderForm`'s existing success handling) and closes; on failure, an inline error message using the existing `ErrorField` component, not a silent failure.

## Error Handling & Validation

- Duration is clamped to [3, 14] by the slider's native `min`/`max` — no out-of-range value is representable in the UI.
- Adult count has a minimum of 1 (can't build a 0-traveler itinerary); child count has a minimum of 0. Both are clamped in the stepper's increment/decrement handlers, not just visually — `calculateCost` also defensively clamps on the way in since it's a pure function callable from tests with arbitrary input.
- Contact-field validation in `LockInDrawer` (required name/email, basic email format check) follows the same inline validation style already used in `TripBuilderForm`'s contact step, reusing the existing `ErrorField` component for messages.
- A failed `/api/contact` POST shows an inline error in the drawer and does not close it — the user's input isn't lost.

## Testing

- Jest unit tests for `src/lib/calculator-utils.ts`: `calculateCost` across traveler-type tiers and adult/child combinations (including the 0-children and minimum-adults edge cases), `getRouteForDuration` across each bucket boundary (3, 4, 7, 8, 10, 11, 14 days). These are pure functions and carry the actual business-rule risk (wrong cost math, wrong route for a given duration).
- A smoke test that `JourneyArchitect` renders without crashing and that changing the duration slider updates the rendered route/cost (React Testing Library, following whatever test setup the project already uses for component tests, if any — confirm during planning).
- Not tested: visual/pixel-level drawer responsiveness (bottom-sheet vs. modal breakpoint) — verified manually in a real browser per this project's established manual-verification practice for UI polish.

## Dependencies

No new packages. Uses only what's already installed: `@headlessui/react` (for `LockInDrawer`, currently unused anywhere else in the codebase), `axios` (existing HTTP client, used by `TripBuilderForm`), `react-icons/fi` (existing icon set). Formik/Yup are available but deliberately not used, per the Architecture section's precedent discussion.

## Risks / Trade-offs

- Placeholder pricing means the live cost estimate is illustrative, not quotable, until real SDF/accommodation/guide/transit figures are supplied — the UI should visually mark the total as an "estimate" (e.g. "~$X, final quote confirmed by our team") so it isn't mistaken for a binding price.
- Route templates are curated/bucketed rather than algorithmically generated from real package inventory — if the business later wants the route to reflect actually bookable packages, that's a follow-up that would need to read `src/data/*.json` and likely a shared `Package` type (noted as a pre-existing gap: no shared `Package`/`Tour` TS type exists today, each detail page redeclares its own).
- `Contact` schema grows with another `source`-specific field set, continuing the existing pattern of one model serving multiple lead types rather than separate models per lead type — consistent with current practice, not a new risk this change introduces.

## Out of Scope

- Package-card redesign, FAQ/visa drawer, and any site-wide color-palette/rebrand work (separate sub-projects from the original decomposed request).
- Any change to the existing `/contactus` `TripBuilderForm` wizard — it continues to exist unchanged alongside this new page.
- Real-time pricing from a live rates API/CMS — rates are static placeholder constants in code for this iteration.
- PDF export of the itinerary (jsPDF/html2canvas are installed and used elsewhere for invoices, but exporting a PDF itinerary here is not requested and would be a future addition).
