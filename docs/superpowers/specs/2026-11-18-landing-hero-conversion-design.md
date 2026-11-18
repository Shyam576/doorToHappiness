# Landing Page Hero Conversion Rework — Design

**Date:** 2026-11-18
**Status:** Approved in chat, pending implementation plan

## Problem

The landing page's primary conversion goal is: visitor uses the hero trip-cost picker, then continues to `/plan-your-trip` and submits an enquiry. The current hero works against that goal:

- Two competing CTAs: "Plan My Bhutan Trip" links to `/contactus` (the older `TripBuilderForm` wizard), while the picker links to `/plan-your-trip`.
- The picker (`TripCostPreview`) is stacked beneath a full-height centered headline block, so on mobile it is below the fold on load.
- The hero image is rendered `unoptimized` with `scale-110`, which hurts LCP and crops the subject.
- `StickyEnquireBar` exists only on package detail pages; the landing page has no persistent CTA once the hero scrolls away.
- The hero shows a live dollar estimate computed from placeholder pricing constants (see the Journey Architect spec).

## Scope

In scope: hero section of `src/pages/index.tsx`, `src/components/TripCostPreview.tsx`, one new sticky mobile CTA component, the calculator pricing config, and their tests.

Out of scope: section reordering, the about/why-us section, testimonials, trust bar, team, footer, and any palette change.

## Design

### 1. Hero layout (`src/pages/index.tsx`)

- **Desktop (`lg` and up):** two columns. Left: `HeroHeading`, one line of value text, and three trust chips (TCB licence #1053196, local licensed guides, visa and SDF handled). Right: the picker card.
- **Mobile:** compact headline, trust chips collapse to a single line, and the picker follows immediately so its price and button are visible without scrolling on a ~667px-tall viewport.
- **Hero image:** remove `scale-110` and `unoptimized`, set an accurate `sizes`, and add a darker left-side gradient so text stays readable over the image.
- Keep the existing LCP preload `<link>` (already using lowercase `fetchpriority`).

### 2. Single primary CTA

- Remove the hero "Plan My Bhutan Trip" button that links to `/contactus`.
- The picker's button is the only primary action, reworded to "See my itinerary & price".
- Keep one secondary text link, "Browse tours", which scrolls to the tours section via the existing `scrollToSection(toursRef)`.

### 3. Picker card (`src/components/TripCostPreview.tsx`)

- Same inputs (trip length slider, traveler type radios) and same deep link query to `/plan-your-trip`.
- Tap targets at least 44px high.
- Price displayed more prominently with a "per group, USD" caption.
- Small print changes to "Final quote confirmed by our team" plus a response-time promise. **The response time (24h was proposed) must be confirmed by the owner before it is shipped;** until confirmed, keep the current "Estimate only" wording.

### 4. Real pricing

- The owner states real rates are ready. They must supply SDF, accommodation, guide, transit, and any child discounts.
- Update the pricing constants in the calculator config (`src/lib/calculator-utils` and its config) and remove the "placeholder" labelling.
- Layout work does not depend on this and can proceed first. Until numbers are supplied, the hero price stays as it is today.

### 5. Sticky mobile CTA

- New component, modelled on `StickyEnquireBar`, shown on mobile only after the hero has scrolled out of view (IntersectionObserver on the hero container).
- Label "Plan my trip"; tapping scrolls back to the picker.
- Must not overlap the chat widget button; position and z-index are verified in the browser.

## Testing and verification

- Update `src/__tests__/components/TripCostPreview.test.tsx` for the new button copy and caption.
- Add a test for the sticky bar's show/hide behaviour (mock IntersectionObserver).
- Run `tsc` (no new errors outside the existing `toBeInTheDocument` test-type errors) and `jest`.
- Manual browser check at 375px and 1280px: picker visible without scrolling on mobile, no horizontal scroll, sticky bar and chat widget do not collide.

## Open items

1. Real pricing numbers (owner to supply).
2. Confirmed quote response time for the picker small print.
