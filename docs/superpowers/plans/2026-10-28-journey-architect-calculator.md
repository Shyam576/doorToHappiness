# Journey Architect Calculator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone `/plan-your-trip` page with a live Bhutan trip cost/itinerary calculator (duration + traveler inputs, real-time cost breakdown and route timeline, a "lock in itinerary" lead-capture drawer).

**Architecture:** Pure calculation logic (`src/lib/calculator-utils.ts`) reads placeholder rate/route data (`src/data/journeyArchitectRates.ts`) and is driven by local `useState` in a `JourneyArchitect` container component, which composes small presentational subcomponents (`src/components/journeyArchitect/`). Submission reuses the existing `/api/contact` lead endpoint by extending the `Contact` Mongoose schema, the same way the existing `TripBuilderForm` added its own fields.

**Tech Stack:** Next.js 13 (pages router), TypeScript, Tailwind CSS (existing amber/forest `siteTheme`), `@headlessui/react` (already installed, unused elsewhere — used here for the drawer), `axios`, `react-icons/fi`, Jest + React Testing Library.

**Spec:** `docs/superpowers/specs/2026-10-28-journey-architect-calculator-design.md`

## Global Constraints

- No new npm dependencies — use only `@headlessui/react`, `axios`, `react-icons/fi`, all already in `package.json`.
- Pricing figures (SDF, accommodation, guide, transit) are placeholder constants only, each commented `// PLACEHOLDER`, isolated to `src/data/journeyArchitectRates.ts`.
- Visual design reuses the existing `siteTheme` from `src/styles/themes.ts` (amber primary / emerald secondary) — no new color tokens, no Tailwind config changes.
- State management is local `useState` only — no Formik, no Redux/Rematch, matching the precedent set by `TripBuilderForm.tsx` and `InvoiceForm.tsx`.
- Submission reuses `POST /api/contact` with `source: 'journey-architect'` by extending `src/models/contact.ts` — no new API route, no new Mongoose model.
- New page lives at `src/pages/plan-your-trip/index.tsx`. The existing `/contactus` `TripBuilderForm` wizard is untouched.
- Tests live under `src/__tests__/`, mirroring the `src/` path of the file under test, using Jest + `@testing-library/react`, following the relative-import style already used in `src/__tests__/components/Container.test.tsx` and `src/__tests__/components/hero3d/*`.
- Duration range is 3–14 days inclusive; adults minimum 1; children minimum 0 — these are the only input bounds (spec: "Error Handling & Validation").

---

### Task 1: Calculator types, pricing data, and pure calculation functions

**Files:**
- Create: `src/data/journeyArchitectRates.ts`
- Create: `src/lib/calculator-utils.ts`
- Test: `src/__tests__/lib/calculator-utils.test.ts`

**Interfaces:**
- Consumes: nothing (foundational task).
- Produces (used by every later task):
  - `export type TravelerType = 'solo' | 'couple' | 'family' | 'trekking-group'`
  - `export const MIN_DURATION_DAYS = 3`, `export const MAX_DURATION_DAYS = 14`, `export const MIN_ADULTS = 1`, `export const MIN_CHILDREN = 0`
  - `export interface CalculatorInput { durationDays: number; adults: number; children: number; travelerType: TravelerType }`
  - `export interface CostLineItem { label: string; amountUsd: number }`
  - `export interface CostBreakdown { sdf: CostLineItem; accommodation: CostLineItem; guide: CostLineItem; transit: CostLineItem; totalUsd: number }`
  - `export interface RouteStop { day: number; location: string; description: string }`
  - `export function calculateCost(input: CalculatorInput): CostBreakdown`
  - `export function getRouteForDuration(days: number): RouteStop[]`

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/lib/calculator-utils.test.ts`:

```ts
import { calculateCost, getRouteForDuration } from '../../lib/calculator-utils'

describe('calculateCost', () => {
  it('computes the breakdown for a solo traveler on a 3-day trip', () => {
    const result = calculateCost({ durationDays: 3, adults: 1, children: 0, travelerType: 'solo' })

    expect(result.sdf.amountUsd).toBe(200)
    expect(result.accommodation.amountUsd).toBe(240)
    expect(result.guide.amountUsd).toBe(105)
    expect(result.transit.amountUsd).toBe(135)
    expect(result.totalUsd).toBe(680)
  })

  it('computes the breakdown for a family with children on a 7-day trip', () => {
    const result = calculateCost({ durationDays: 7, adults: 2, children: 2, travelerType: 'family' })

    expect(result.sdf.amountUsd).toBe(1800)
    expect(result.accommodation.amountUsd).toBe(1920)
    expect(result.guide.amountUsd).toBe(245)
    expect(result.transit.amountUsd).toBe(315)
    expect(result.totalUsd).toBe(4280)
  })

  it('clamps duration above the maximum to 14 days', () => {
    const result = calculateCost({ durationDays: 20, adults: 1, children: 0, travelerType: 'couple' })
    const expected = calculateCost({ durationDays: 14, adults: 1, children: 0, travelerType: 'couple' })

    expect(result).toEqual(expected)
  })

  it('clamps duration below the minimum to 3 days', () => {
    const result = calculateCost({ durationDays: 1, adults: 1, children: 0, travelerType: 'solo' })
    const expected = calculateCost({ durationDays: 3, adults: 1, children: 0, travelerType: 'solo' })

    expect(result).toEqual(expected)
  })

  it('clamps adults below the minimum to 1 and children below the minimum to 0', () => {
    const result = calculateCost({ durationDays: 5, adults: 0, children: -3, travelerType: 'couple' })
    const expected = calculateCost({ durationDays: 5, adults: 1, children: 0, travelerType: 'couple' })

    expect(result).toEqual(expected)
  })
})

describe('getRouteForDuration', () => {
  it('returns one stop per day for a 3-day trip, starting at Paro and ending at Thimphu', () => {
    const route = getRouteForDuration(3)

    expect(route).toHaveLength(3)
    expect(route.map((stop) => stop.day)).toEqual([1, 2, 3])
    expect(route[0].location).toBe('Paro')
    expect(route[route.length - 1].location).toBe('Thimphu')
  })

  it('returns a 14-day route ending at Bumthang', () => {
    const route = getRouteForDuration(14)

    expect(route).toHaveLength(14)
    expect(route[0].location).toBe('Paro')
    expect(route[route.length - 1].location).toBe('Bumthang')
  })

  it('clamps a duration above the maximum to a 14-day route', () => {
    const route = getRouteForDuration(20)
    const expected = getRouteForDuration(14)

    expect(route).toEqual(expected)
  })

  it('clamps a duration below the minimum to a 3-day route', () => {
    const route = getRouteForDuration(1)
    const expected = getRouteForDuration(3)

    expect(route).toEqual(expected)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm exec jest calculator-utils --watchAll=false`
Expected: FAIL — `Cannot find module '../../lib/calculator-utils'`

- [ ] **Step 3: Write the pricing/route data file**

Create `src/data/journeyArchitectRates.ts`:

```ts
// Placeholder trip-cost rates for the Journey Architect calculator.
// These are NOT official figures. Replace every PLACEHOLDER value below with
// current rates (Sustainable Development Fee, accommodation, guide, transit)
// before this calculator is used to produce real quotes.

export const SDF_PER_ADULT_PER_NIGHT_USD = 100 // PLACEHOLDER
export const SDF_PER_CHILD_PER_NIGHT_USD = 50 // PLACEHOLDER — ages 6-12

export const ACCOMMODATION_PER_NIGHT_USD_BY_TYPE: Record<
  'solo' | 'couple' | 'family' | 'trekking-group',
  number
> = {
  solo: 120, // PLACEHOLDER
  couple: 95, // PLACEHOLDER — blended per-person rate, shared room
  family: 80, // PLACEHOLDER — blended per-person rate, group discount
  'trekking-group': 70, // PLACEHOLDER — blended per-person rate, group discount
}

export const GUIDE_PER_DAY_USD = 35 // PLACEHOLDER
export const TRANSIT_PER_DAY_USD = 45 // PLACEHOLDER

export interface RouteTemplateStop {
  location: string
  description: string
}

export interface RouteTemplate {
  minDays: number
  maxDays: number
  stops: RouteTemplateStop[]
}

// Stop names mirror the towns already featured in src/data/destinations.json
// (Paro, Thimphu, Punakha, Phobjika) so the illustrative route reflects real
// Bhutanese geography rather than invented place names.
export const ROUTE_TEMPLATES: RouteTemplate[] = [
  {
    minDays: 3,
    maxDays: 4,
    stops: [
      { location: 'Paro', description: "Arrival, Rinpung Dzong, and the approach to Taktsang (Tiger's Nest)." },
      { location: 'Thimphu', description: 'Capital city sightseeing: Tashichho Dzong, Buddha Dordenma, and local markets.' },
    ],
  },
  {
    minDays: 5,
    maxDays: 7,
    stops: [
      { location: 'Paro', description: "Arrival, Rinpung Dzong, and the hike to Taktsang (Tiger's Nest)." },
      { location: 'Thimphu', description: 'Capital city sightseeing and local culture.' },
      { location: 'Punakha', description: 'Punakha Dzong and the Mo Chhu / Pho Chhu river valley.' },
    ],
  },
  {
    minDays: 8,
    maxDays: 10,
    stops: [
      { location: 'Paro', description: "Arrival, Rinpung Dzong, and the hike to Taktsang (Tiger's Nest)." },
      { location: 'Thimphu', description: 'Capital city sightseeing and local culture.' },
      { location: 'Punakha', description: 'Punakha Dzong and the river valley.' },
      { location: 'Phobjika', description: 'Gangtey Monastery and the Phobjikha Valley.' },
    ],
  },
  {
    minDays: 11,
    maxDays: 14,
    stops: [
      { location: 'Paro', description: "Arrival, Rinpung Dzong, and the hike to Taktsang (Tiger's Nest)." },
      { location: 'Thimphu', description: 'Capital city sightseeing and local culture.' },
      { location: 'Punakha', description: 'Punakha Dzong and the river valley.' },
      { location: 'Phobjika', description: 'Gangtey Monastery and the Phobjikha Valley.' },
      { location: 'Bumthang', description: 'Historic temples and the cultural heartland of central Bhutan.' },
    ],
  },
]
```

- [ ] **Step 4: Write the calculation functions**

Create `src/lib/calculator-utils.ts`:

```ts
import {
  SDF_PER_ADULT_PER_NIGHT_USD,
  SDF_PER_CHILD_PER_NIGHT_USD,
  ACCOMMODATION_PER_NIGHT_USD_BY_TYPE,
  GUIDE_PER_DAY_USD,
  TRANSIT_PER_DAY_USD,
  ROUTE_TEMPLATES,
} from '../data/journeyArchitectRates'

export const MIN_DURATION_DAYS = 3
export const MAX_DURATION_DAYS = 14
export const MIN_ADULTS = 1
export const MIN_CHILDREN = 0

export type TravelerType = 'solo' | 'couple' | 'family' | 'trekking-group'

export interface CalculatorInput {
  durationDays: number
  adults: number
  children: number
  travelerType: TravelerType
}

export interface CostLineItem {
  label: string
  amountUsd: number
}

export interface CostBreakdown {
  sdf: CostLineItem
  accommodation: CostLineItem
  guide: CostLineItem
  transit: CostLineItem
  totalUsd: number
}

export interface RouteStop {
  day: number
  location: string
  description: string
}

function clampInput(input: CalculatorInput): CalculatorInput {
  return {
    durationDays: Math.min(MAX_DURATION_DAYS, Math.max(MIN_DURATION_DAYS, input.durationDays)),
    adults: Math.max(MIN_ADULTS, input.adults),
    children: Math.max(MIN_CHILDREN, input.children),
    travelerType: input.travelerType,
  }
}

export function calculateCost(input: CalculatorInput): CostBreakdown {
  const { durationDays, adults, children, travelerType } = clampInput(input)
  const nights = Math.max(0, durationDays - 1)
  const travelerCount = adults + children

  const sdfAmount = nights * (adults * SDF_PER_ADULT_PER_NIGHT_USD + children * SDF_PER_CHILD_PER_NIGHT_USD)
  const accommodationAmount = nights * travelerCount * ACCOMMODATION_PER_NIGHT_USD_BY_TYPE[travelerType]
  const guideAmount = durationDays * GUIDE_PER_DAY_USD
  const transitAmount = durationDays * TRANSIT_PER_DAY_USD

  const sdf: CostLineItem = { label: 'Sustainable Development Fee', amountUsd: Math.round(sdfAmount) }
  const accommodation: CostLineItem = { label: 'Accommodation', amountUsd: Math.round(accommodationAmount) }
  const guide: CostLineItem = { label: 'Licensed Guide', amountUsd: Math.round(guideAmount) }
  const transit: CostLineItem = { label: 'Private Transit', amountUsd: Math.round(transitAmount) }

  return {
    sdf,
    accommodation,
    guide,
    transit,
    totalUsd: sdf.amountUsd + accommodation.amountUsd + guide.amountUsd + transit.amountUsd,
  }
}

export function getRouteForDuration(days: number): RouteStop[] {
  const clampedDays = Math.min(MAX_DURATION_DAYS, Math.max(MIN_DURATION_DAYS, days))
  const template =
    ROUTE_TEMPLATES.find((t) => clampedDays >= t.minDays && clampedDays <= t.maxDays) ??
    ROUTE_TEMPLATES[ROUTE_TEMPLATES.length - 1]

  const stops = template.stops
  const result: RouteStop[] = []
  for (let day = 1; day <= clampedDays; day++) {
    const stopIndex = Math.min(stops.length - 1, Math.floor(((day - 1) / clampedDays) * stops.length))
    const stop = stops[stopIndex]
    result.push({ day, location: stop.location, description: stop.description })
  }
  return result
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `pnpm exec jest calculator-utils --watchAll=false`
Expected: PASS — 9 tests.

- [ ] **Step 6: Commit**

```bash
git add src/data/journeyArchitectRates.ts src/lib/calculator-utils.ts src/__tests__/lib/calculator-utils.test.ts
git commit -m "feat: add Journey Architect cost and route calculation logic"
```

---

### Task 2: Extend the Contact model for journey-architect leads

**Files:**
- Modify: `src/models/contact.ts`

**Interfaces:**
- Consumes: nothing from Task 1.
- Produces: `Contact` schema accepts optional `durationDays: number`, `adults: number`, `children: number`, `travelerType: string`, `estimatedCostUsd: number`, `routeSummary: string` — consumed by Task 7's `LockInDrawer` submission payload.

- [ ] **Step 1: Add the new optional fields to the schema**

Modify `src/models/contact.ts` — replace the full file with:

```ts
import mongoose, { Schema, model, models, Document } from 'mongoose';

interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
  travelMonth?: string;
  tripLength?: string;
  interests?: string[];
  travelParty?: string;
  durationDays?: number;
  adults?: number;
  children?: number;
  travelerType?: string;
  estimatedCostUsd?: number;
  routeSummary?: string;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Please provide a message.'],
    trim: true,
  },
  // Enquiry origin — 'contact-form' (default, general enquiry), 'trip-builder',
  // or 'journey-architect'
  source: {
    type: String,
    default: 'contact-form',
    trim: true,
  },
  // Trip-builder fields — only populated when source is 'trip-builder'
  travelMonth: {
    type: String,
    trim: true,
  },
  tripLength: {
    type: String,
    trim: true,
  },
  interests: {
    type: [String],
    default: undefined,
  },
  travelParty: {
    type: String,
    trim: true,
  },
  // Journey Architect fields — only populated when source is 'journey-architect'
  durationDays: {
    type: Number,
  },
  adults: {
    type: Number,
  },
  children: {
    type: Number,
  },
  travelerType: {
    type: String,
    trim: true,
  },
  estimatedCostUsd: {
    type: Number,
  },
  routeSummary: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = (models.Contact as mongoose.Model<IContact>) || model<IContact>('Contact', ContactSchema);

export default Contact;
```

- [ ] **Step 2: Verify it compiles**

Run: `pnpm exec tsc --noEmit --incremental false 2>&1 | grep -i "models/contact"`
Expected: no output (clean).

- [ ] **Step 3: Commit**

```bash
git add src/models/contact.ts
git commit -m "feat: add journey-architect fields to the Contact lead schema"
```

---

### Task 3: DurationSlider component

**Files:**
- Create: `src/components/journeyArchitect/DurationSlider.tsx`
- Test: `src/__tests__/components/journeyArchitect/DurationSlider.test.tsx`

**Interfaces:**
- Consumes: `MIN_DURATION_DAYS`, `MAX_DURATION_DAYS` from `src/lib/calculator-utils` (Task 1).
- Produces: `DurationSlider({ value: number; onChange: (days: number) => void })`, used by Task 8's `JourneyArchitect`.

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/components/journeyArchitect/DurationSlider.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { DurationSlider } from '../../../components/journeyArchitect/DurationSlider'

describe('DurationSlider', () => {
  it('displays the current duration', () => {
    render(<DurationSlider value={5} onChange={jest.fn()} />)
    expect(screen.getByText('5 days')).toBeInTheDocument()
  })

  it('calls onChange with the new value when moved', () => {
    const onChange = jest.fn()
    render(<DurationSlider value={5} onChange={onChange} />)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '10' } })
    expect(onChange).toHaveBeenCalledWith(10)
  })

  it('uses the singular "day" label for a value of 1', () => {
    render(<DurationSlider value={1} onChange={jest.fn()} />)
    expect(screen.getByText('1 day')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm exec jest DurationSlider --watchAll=false`
Expected: FAIL — `Cannot find module '../../../components/journeyArchitect/DurationSlider'`

- [ ] **Step 3: Write the component**

Create `src/components/journeyArchitect/DurationSlider.tsx`:

```tsx
import { MIN_DURATION_DAYS, MAX_DURATION_DAYS } from '../../lib/calculator-utils'

interface DurationSliderProps {
  value: number
  onChange: (days: number) => void
}

export function DurationSlider({ value, onChange }: DurationSliderProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="ja-duration" className="text-sm font-medium text-gray-700">
          Trip length
        </label>
        <span className="text-sm font-semibold text-amber-700">
          {value} {value === 1 ? 'day' : 'days'}
        </span>
      </div>
      <input
        id="ja-duration"
        type="range"
        min={MIN_DURATION_DAYS}
        max={MAX_DURATION_DAYS}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-amber-600"
        aria-valuemin={MIN_DURATION_DAYS}
        aria-valuemax={MAX_DURATION_DAYS}
        aria-valuenow={value}
      />
      <div className="flex justify-between text-xs text-stone-500 mt-1">
        <span>{MIN_DURATION_DAYS} days</span>
        <span>{MAX_DURATION_DAYS} days</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm exec jest DurationSlider --watchAll=false`
Expected: PASS — 3 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/journeyArchitect/DurationSlider.tsx src/__tests__/components/journeyArchitect/DurationSlider.test.tsx
git commit -m "feat: add DurationSlider component for Journey Architect"
```

---

### Task 4: TravelerSelector component

**Files:**
- Create: `src/components/journeyArchitect/TravelerSelector.tsx`
- Test: `src/__tests__/components/journeyArchitect/TravelerSelector.test.tsx`

**Interfaces:**
- Consumes: `TravelerType`, `MIN_ADULTS`, `MIN_CHILDREN` from `src/lib/calculator-utils` (Task 1); `getTheme` from `src/styles/themes`.
- Produces: `TravelerSelector({ adults: number; childrenCount: number; travelerType: TravelerType; onAdultsChange: (n: number) => void; onChildrenCountChange: (n: number) => void; onTravelerTypeChange: (t: TravelerType) => void })`, used by Task 8's `JourneyArchitect`.

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/components/journeyArchitect/TravelerSelector.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { TravelerSelector } from '../../../components/journeyArchitect/TravelerSelector'

describe('TravelerSelector', () => {
  const baseProps = {
    adults: 2,
    childrenCount: 1,
    travelerType: 'couple' as const,
    onAdultsChange: jest.fn(),
    onChildrenCountChange: jest.fn(),
    onTravelerTypeChange: jest.fn(),
  }

  it('increments adults when the increase button is clicked', () => {
    const onAdultsChange = jest.fn()
    render(<TravelerSelector {...baseProps} onAdultsChange={onAdultsChange} />)
    fireEvent.click(screen.getByLabelText('Increase adults'))
    expect(onAdultsChange).toHaveBeenCalledWith(3)
  })

  it('does not decrement adults below the minimum of 1', () => {
    const onAdultsChange = jest.fn()
    render(<TravelerSelector {...baseProps} adults={1} onAdultsChange={onAdultsChange} />)
    fireEvent.click(screen.getByLabelText('Decrease adults'))
    expect(onAdultsChange).toHaveBeenCalledWith(1)
  })

  it('does not decrement children below the minimum of 0', () => {
    const onChildrenCountChange = jest.fn()
    render(<TravelerSelector {...baseProps} childrenCount={0} onChildrenCountChange={onChildrenCountChange} />)
    fireEvent.click(screen.getByLabelText('Decrease children'))
    expect(onChildrenCountChange).toHaveBeenCalledWith(0)
  })

  it('selects a traveler type', () => {
    const onTravelerTypeChange = jest.fn()
    render(<TravelerSelector {...baseProps} onTravelerTypeChange={onTravelerTypeChange} />)
    fireEvent.click(screen.getByRole('radio', { name: 'Family' }))
    expect(onTravelerTypeChange).toHaveBeenCalledWith('family')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm exec jest TravelerSelector --watchAll=false`
Expected: FAIL — `Cannot find module '../../../components/journeyArchitect/TravelerSelector'`

- [ ] **Step 3: Write the component**

Create `src/components/journeyArchitect/TravelerSelector.tsx`:

```tsx
import { TravelerType, MIN_ADULTS, MIN_CHILDREN } from '../../lib/calculator-utils'
import { getTheme } from '../../styles/themes'

const TRAVELER_TYPE_OPTIONS: { value: TravelerType; label: string }[] = [
  { value: 'solo', label: 'Solo' },
  { value: 'couple', label: 'Couple' },
  { value: 'family', label: 'Family' },
  { value: 'trekking-group', label: 'Trekking Group' },
]

interface TravelerSelectorProps {
  adults: number
  childrenCount: number
  travelerType: TravelerType
  onAdultsChange: (adults: number) => void
  onChildrenCountChange: (childrenCount: number) => void
  onTravelerTypeChange: (type: TravelerType) => void
}

export function TravelerSelector({
  adults,
  childrenCount,
  travelerType,
  onAdultsChange,
  onChildrenCountChange,
  onTravelerTypeChange,
}: TravelerSelectorProps) {
  const theme = getTheme()

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Travelers</p>
        <div className="flex items-center gap-6">
          <Stepper label="Adults" value={adults} min={MIN_ADULTS} onChange={onAdultsChange} />
          <Stepper label="Children" value={childrenCount} min={MIN_CHILDREN} onChange={onChildrenCountChange} />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Traveling as</p>
        <div role="radiogroup" aria-label="Traveler type" className="grid grid-cols-2 gap-3">
          {TRAVELER_TYPE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={travelerType === option.value}
              onClick={() => onTravelerTypeChange(option.value)}
              className={`px-4 py-3 rounded-lg border-2 text-sm font-medium text-left transition-colors ${
                travelerType === option.value
                  ? `${theme.primaryBorder} ${theme.primaryLight} ${theme.primaryText}`
                  : 'border-gray-300 text-gray-700 hover:border-amber-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

interface StepperProps {
  label: string
  value: number
  min: number
  onChange: (value: number) => void
}

function Stepper({ label, value, min, onChange }: StepperProps) {
  return (
    <div>
      <p className="text-xs text-stone-500 mb-1">{label}</p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-full border border-gray-300 text-gray-700 hover:border-amber-400 flex items-center justify-center"
        >
          −
        </button>
        <span className="w-6 text-center font-semibold text-gray-800">{value}</span>
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          onClick={() => onChange(value + 1)}
          className="w-8 h-8 rounded-full border border-gray-300 text-gray-700 hover:border-amber-400 flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm exec jest TravelerSelector --watchAll=false`
Expected: PASS — 4 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/journeyArchitect/TravelerSelector.tsx src/__tests__/components/journeyArchitect/TravelerSelector.test.tsx
git commit -m "feat: add TravelerSelector component for Journey Architect"
```

---

### Task 5: RouteTimeline component

**Files:**
- Create: `src/components/journeyArchitect/RouteTimeline.tsx`
- Test: `src/__tests__/components/journeyArchitect/RouteTimeline.test.tsx`

**Interfaces:**
- Consumes: `RouteStop` from `src/lib/calculator-utils` (Task 1).
- Produces: `RouteTimeline({ stops: RouteStop[] })`, used by Task 8's `JourneyArchitect`.

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/components/journeyArchitect/RouteTimeline.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { RouteTimeline } from '../../../components/journeyArchitect/RouteTimeline'

describe('RouteTimeline', () => {
  it('renders one entry per stop, in order, with day badges', () => {
    render(
      <RouteTimeline
        stops={[
          { day: 1, location: 'Paro', description: 'Arrival day.' },
          { day: 2, location: 'Thimphu', description: 'Capital sightseeing.' },
        ]}
      />
    )

    const locations = screen.getAllByText(/^(Paro|Thimphu)$/)
    expect(locations.map((el) => el.textContent)).toEqual(['Paro', 'Thimphu'])
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('Arrival day.')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm exec jest RouteTimeline --watchAll=false`
Expected: FAIL — `Cannot find module '../../../components/journeyArchitect/RouteTimeline'`

- [ ] **Step 3: Write the component**

Create `src/components/journeyArchitect/RouteTimeline.tsx`:

```tsx
import { RouteStop } from '../../lib/calculator-utils'

interface RouteTimelineProps {
  stops: RouteStop[]
}

export function RouteTimeline({ stops }: RouteTimelineProps) {
  return (
    <div className="space-y-3">
      {stops.map((stop) => (
        <div key={stop.day} className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
            {stop.day}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{stop.location}</p>
            <p className="text-sm text-stone-600">{stop.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm exec jest RouteTimeline --watchAll=false`
Expected: PASS — 1 test.

- [ ] **Step 5: Commit**

```bash
git add src/components/journeyArchitect/RouteTimeline.tsx src/__tests__/components/journeyArchitect/RouteTimeline.test.tsx
git commit -m "feat: add RouteTimeline component for Journey Architect"
```

---

### Task 6: CostBreakdown component

**Files:**
- Create: `src/components/journeyArchitect/CostBreakdown.tsx`
- Test: `src/__tests__/components/journeyArchitect/CostBreakdown.test.tsx`

**Interfaces:**
- Consumes: `CostBreakdown` type from `src/lib/calculator-utils` (Task 1) — imported aliased to avoid colliding with this component's own name.
- Produces: `CostBreakdown({ breakdown: CostBreakdownData })` component, used by Task 8's `JourneyArchitect`.

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/components/journeyArchitect/CostBreakdown.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { CostBreakdown } from '../../../components/journeyArchitect/CostBreakdown'

describe('CostBreakdown', () => {
  it('renders each line item and the total', () => {
    render(
      <CostBreakdown
        breakdown={{
          sdf: { label: 'Sustainable Development Fee', amountUsd: 200 },
          accommodation: { label: 'Accommodation', amountUsd: 240 },
          guide: { label: 'Licensed Guide', amountUsd: 105 },
          transit: { label: 'Private Transit', amountUsd: 135 },
          totalUsd: 680,
        }}
      />
    )

    expect(screen.getByText('Sustainable Development Fee')).toBeInTheDocument()
    expect(screen.getByText('$200')).toBeInTheDocument()
    expect(screen.getByText('Estimated total')).toBeInTheDocument()
    expect(screen.getByText('$680')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm exec jest CostBreakdown --watchAll=false`
Expected: FAIL — `Cannot find module '../../../components/journeyArchitect/CostBreakdown'`

- [ ] **Step 3: Write the component**

Create `src/components/journeyArchitect/CostBreakdown.tsx`:

```tsx
import { CostBreakdown as CostBreakdownData } from '../../lib/calculator-utils'

interface CostBreakdownProps {
  breakdown: CostBreakdownData
}

export function CostBreakdown({ breakdown }: CostBreakdownProps) {
  const lineItems = [breakdown.sdf, breakdown.accommodation, breakdown.guide, breakdown.transit]

  return (
    <div className="bg-stone-50 rounded-lg p-5">
      <ul className="space-y-2">
        {lineItems.map((item) => (
          <li key={item.label} className="flex justify-between text-sm text-gray-700">
            <span>{item.label}</span>
            <span>${item.amountUsd.toLocaleString()}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-baseline mt-4 pt-4 border-t border-stone-200">
        <span className="font-semibold text-gray-800">Estimated total</span>
        <span className="text-2xl font-bold text-amber-700">${breakdown.totalUsd.toLocaleString()}</span>
      </div>
      <p className="text-xs text-stone-500 mt-2">
        Estimate only — your final quote will be confirmed by our team.
      </p>
    </div>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm exec jest CostBreakdown --watchAll=false`
Expected: PASS — 1 test.

- [ ] **Step 5: Commit**

```bash
git add src/components/journeyArchitect/CostBreakdown.tsx src/__tests__/components/journeyArchitect/CostBreakdown.test.tsx
git commit -m "feat: add CostBreakdown component for Journey Architect"
```

---

### Task 7: LockInDrawer component

**Files:**
- Create: `src/components/journeyArchitect/LockInDrawer.tsx`
- Test: `src/__tests__/components/journeyArchitect/LockInDrawer.test.tsx`

**Interfaces:**
- Consumes: `CalculatorInput`, `CostBreakdown` (aliased), `RouteStop` from `src/lib/calculator-utils` (Task 1); the extended `Contact` schema fields from Task 2 (via the `/api/contact` payload shape); `ErrorField` from `src/components/ErrorField`; `getTheme` from `src/styles/themes`.
- Produces: `LockInDrawer({ isOpen: boolean; onClose: () => void; input: CalculatorInput; breakdown: CostBreakdownData; routeStops: RouteStop[] })`, used by Task 8's `JourneyArchitect`.

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/components/journeyArchitect/LockInDrawer.test.tsx`:

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import { LockInDrawer } from '../../../components/journeyArchitect/LockInDrawer'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const breakdown = {
  sdf: { label: 'Sustainable Development Fee', amountUsd: 200 },
  accommodation: { label: 'Accommodation', amountUsd: 240 },
  guide: { label: 'Licensed Guide', amountUsd: 105 },
  transit: { label: 'Private Transit', amountUsd: 135 },
  totalUsd: 680,
}

const routeStops = [
  { day: 1, location: 'Paro', description: 'Arrival.' },
  { day: 2, location: 'Thimphu', description: 'Sightseeing.' },
]

const input = { durationDays: 3, adults: 1, children: 0, travelerType: 'solo' as const }

describe('LockInDrawer', () => {
  afterEach(() => jest.clearAllMocks())

  it('submits the calculator summary to /api/contact with source journey-architect', async () => {
    mockedAxios.post.mockResolvedValueOnce({ status: 201, data: {} })

    render(<LockInDrawer isOpen onClose={jest.fn()} input={input} breakdown={breakdown} routeStops={routeStops} />)

    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Jane Doe' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /confirm request/i }))

    await waitFor(() =>
      expect(mockedAxios.post).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({
          name: 'Jane Doe',
          email: 'jane@example.com',
          source: 'journey-architect',
          durationDays: 3,
          estimatedCostUsd: 680,
        }),
        expect.anything()
      )
    )

    await waitFor(() => expect(screen.getByText('Request sent!')).toBeInTheDocument())
  })

  it('shows a validation error and does not submit when name/email are missing', () => {
    render(<LockInDrawer isOpen onClose={jest.fn()} input={input} breakdown={breakdown} routeStops={routeStops} />)

    fireEvent.click(screen.getByRole('button', { name: /confirm request/i }))

    expect(screen.getByText('Please provide your name and email.')).toBeInTheDocument()
    expect(mockedAxios.post).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm exec jest LockInDrawer --watchAll=false`
Expected: FAIL — `Cannot find module '../../../components/journeyArchitect/LockInDrawer'`

- [ ] **Step 3: Write the component**

Create `src/components/journeyArchitect/LockInDrawer.tsx`:

```tsx
import { Fragment, useState, FormEvent } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { FiCheck, FiX } from 'react-icons/fi'
import { CalculatorInput, CostBreakdown as CostBreakdownData, RouteStop } from '../../lib/calculator-utils'
import { ErrorField } from '../ErrorField'
import { getTheme } from '../../styles/themes'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface LockInDrawerProps {
  isOpen: boolean
  onClose: () => void
  input: CalculatorInput
  breakdown: CostBreakdownData
  routeStops: RouteStop[]
}

export function LockInDrawer({ isOpen, onClose, input, breakdown, routeStops }: LockInDrawerProps) {
  const theme = getTheme()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [fieldError, setFieldError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null)

  const routeSummary = routeStops.map((stop) => stop.location).join(' → ')

  const handleClose = () => {
    setFieldError(null)
    setSubmitStatus(null)
    onClose()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !email.trim()) {
      setFieldError('Please provide your name and email.')
      return
    }
    if (!emailRegex.test(email)) {
      setFieldError('Please enter a valid email address.')
      return
    }

    setFieldError(null)
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await axios.post(
        '/api/contact',
        {
          name,
          email,
          phone,
          message: `Journey Architect enquiry — ${input.durationDays} days, ${input.adults} adult(s), ${input.children} child(ren), traveling as ${input.travelerType}. Route: ${routeSummary}. Estimated cost: $${breakdown.totalUsd}.`,
          source: 'journey-architect',
          durationDays: input.durationDays,
          adults: input.adults,
          children: input.children,
          travelerType: input.travelerType,
          estimatedCostUsd: breakdown.totalUsd,
          routeSummary,
        },
        { headers: { 'Content-Type': 'application/json' } }
      )

      setSubmitStatus(response.status === 201 ? 'success' : 'error')
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={handleClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-end sm:items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-6 shadow-warm-xl">
              <div className="flex items-start justify-between mb-4">
                <Dialog.Title className="text-lg font-bold text-gray-800">Lock in this itinerary</Dialog.Title>
                <button type="button" onClick={handleClose} aria-label="Close">
                  <FiX className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              {submitStatus === 'success' ? (
                <div className="text-center py-6">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${theme.primaryLight} mb-3`}
                  >
                    <FiCheck className={`w-6 h-6 ${theme.primaryText}`} />
                  </div>
                  <p className="font-semibold text-gray-800 mb-1">Request sent!</p>
                  <p className="text-sm text-stone-600">
                    Our team will confirm your itinerary and final quote shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-sm text-stone-600">
                    {input.durationDays} days · {input.adults} adult{input.adults === 1 ? '' : 's'}
                    {input.children > 0 ? `, ${input.children} child${input.children === 1 ? '' : 'ren'}` : ''} ·
                    estimated ${breakdown.totalUsd.toLocaleString()}
                  </p>
                  <div>
                    <label htmlFor="ja-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="ja-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="ja-email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="ja-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="ja-phone" className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      id="ja-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  {fieldError && <ErrorField error={fieldError} />}
                  {submitStatus === 'error' && (
                    <p className="text-sm text-red-600">
                      Something went wrong sending your request. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition ${theme.primary} ${theme.primaryHover} ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Confirm Request'}
                  </button>
                </form>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm exec jest LockInDrawer --watchAll=false`
Expected: PASS — 2 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/journeyArchitect/LockInDrawer.tsx src/__tests__/components/journeyArchitect/LockInDrawer.test.tsx
git commit -m "feat: add LockInDrawer component for Journey Architect"
```

---

### Task 8: JourneyArchitect container

**Files:**
- Create: `src/components/journeyArchitect/JourneyArchitect.tsx`
- Test: `src/__tests__/components/journeyArchitect/JourneyArchitect.test.tsx`

**Interfaces:**
- Consumes: `CalculatorInput`, `TravelerType`, `calculateCost`, `getRouteForDuration` from `src/lib/calculator-utils` (Task 1); `DurationSlider` (Task 3); `TravelerSelector` (Task 4); `RouteTimeline` (Task 5); `CostBreakdown` (Task 6); `LockInDrawer` (Task 7); `getTheme` from `src/styles/themes`.
- Produces: `JourneyArchitect()` component with no props, used by Task 9's page.

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/components/journeyArchitect/JourneyArchitect.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { JourneyArchitect } from '../../../components/journeyArchitect/JourneyArchitect'
import { calculateCost, getRouteForDuration } from '../../../lib/calculator-utils'

describe('JourneyArchitect', () => {
  it('renders a default estimate matching the calculator for 7 days, 2 adults, couple', () => {
    render(<JourneyArchitect />)

    const expected = calculateCost({ durationDays: 7, adults: 2, children: 0, travelerType: 'couple' })
    expect(screen.getByText('7 days')).toBeInTheDocument()
    expect(screen.getByText(`$${expected.totalUsd.toLocaleString()}`)).toBeInTheDocument()

    const expectedRoute = getRouteForDuration(7)
    expect(screen.getAllByText(expectedRoute[0].location)[0]).toBeInTheDocument()
  })

  it('updates the displayed duration and total cost when the slider moves', () => {
    render(<JourneyArchitect />)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '14' } })
    expect(screen.getByText('14 days')).toBeInTheDocument()

    const expected14 = calculateCost({ durationDays: 14, adults: 2, children: 0, travelerType: 'couple' })
    expect(screen.getByText(`$${expected14.totalUsd.toLocaleString()}`)).toBeInTheDocument()
  })

  it('opens the lock-in drawer when the CTA is clicked', () => {
    render(<JourneyArchitect />)
    fireEvent.click(screen.getByRole('button', { name: /lock in this itinerary/i }))
    expect(screen.getByText('Lock in this itinerary')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm exec jest JourneyArchitect.test --watchAll=false`
Expected: FAIL — `Cannot find module '../../../components/journeyArchitect/JourneyArchitect'`

- [ ] **Step 3: Write the component**

Create `src/components/journeyArchitect/JourneyArchitect.tsx`:

```tsx
import { useState } from 'react'
import { CalculatorInput, TravelerType, calculateCost, getRouteForDuration } from '../../lib/calculator-utils'
import { DurationSlider } from './DurationSlider'
import { TravelerSelector } from './TravelerSelector'
import { RouteTimeline } from './RouteTimeline'
import { CostBreakdown } from './CostBreakdown'
import { LockInDrawer } from './LockInDrawer'
import { getTheme } from '../../styles/themes'

const initialInput: CalculatorInput = {
  durationDays: 7,
  adults: 2,
  children: 0,
  travelerType: 'couple',
}

export function JourneyArchitect() {
  const theme = getTheme()
  const [input, setInput] = useState<CalculatorInput>(initialInput)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const breakdown = calculateCost(input)
  const routeStops = getRouteForDuration(input.durationDays)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <DurationSlider
          value={input.durationDays}
          onChange={(durationDays) => setInput((prev) => ({ ...prev, durationDays }))}
        />
        <TravelerSelector
          adults={input.adults}
          childrenCount={input.children}
          travelerType={input.travelerType}
          onAdultsChange={(adults) => setInput((prev) => ({ ...prev, adults }))}
          onChildrenCountChange={(children) => setInput((prev) => ({ ...prev, children }))}
          onTravelerTypeChange={(travelerType: TravelerType) => setInput((prev) => ({ ...prev, travelerType }))}
        />
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Your route</p>
          <RouteTimeline stops={routeStops} />
        </div>
      </div>

      <div className="space-y-6">
        <CostBreakdown breakdown={breakdown} />
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition ${theme.primary} ${theme.primaryHover}`}
        >
          Lock in this Itinerary
        </button>
      </div>

      <LockInDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        input={input}
        breakdown={breakdown}
        routeStops={routeStops}
      />
    </div>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm exec jest JourneyArchitect.test --watchAll=false`
Expected: PASS — 3 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/journeyArchitect/JourneyArchitect.tsx src/__tests__/components/journeyArchitect/JourneyArchitect.test.tsx
git commit -m "feat: add JourneyArchitect container component"
```

---

### Task 9: /plan-your-trip page and manual browser verification

**Files:**
- Create: `src/pages/plan-your-trip/index.tsx`
- Test: `src/__tests__/pages/plan-your-trip.test.tsx`

**Interfaces:**
- Consumes: `JourneyArchitect` from Task 8; `Container` from `src/components/Container`.
- Produces: the page itself — the final integration point, nothing downstream depends on it.

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/pages/plan-your-trip.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import PlanYourTripPage from '../../pages/plan-your-trip/index'

describe('PlanYourTripPage', () => {
  it('renders the heading and the calculator', () => {
    render(<PlanYourTripPage />)
    expect(screen.getByRole('heading', { name: 'Plan Your Bhutan Trip' })).toBeInTheDocument()
    expect(screen.getByText('Lock in this Itinerary')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm exec jest plan-your-trip --watchAll=false`
Expected: FAIL — `Cannot find module '../../pages/plan-your-trip/index'`

- [ ] **Step 3: Write the page**

Create `src/pages/plan-your-trip/index.tsx`:

```tsx
import Head from 'next/head'
import { Container } from '../../components/Container'
import { JourneyArchitect } from '../../components/journeyArchitect/JourneyArchitect'

export default function PlanYourTripPage() {
  return (
    <>
      <Head>
        <title>Plan Your Bhutan Trip - Door to Happiness Holiday</title>
        <meta
          name="description"
          content="Build your own Bhutan itinerary: choose your trip length and travelers, see a live cost estimate and route, then lock it in."
        />
        <meta property="og:title" content="Plan Your Bhutan Trip | Door to Happiness Holiday" />
        <meta
          property="og:description"
          content="Build your own Bhutan itinerary with a live cost estimate and route timeline."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.doortohappinessholidays.com/plan-your-trip" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Plan Your Bhutan Trip</h1>
            <p className="text-stone-600 mb-8 sm:mb-10 max-w-2xl">
              Adjust your trip length and travelers to see a live cost estimate and route, then lock in your
              itinerary and our team will confirm the details.
            </p>
            <JourneyArchitect />
          </div>
        </Container>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm exec jest plan-your-trip --watchAll=false`
Expected: PASS — 1 test.

- [ ] **Step 5: Run the full test suite and typecheck**

Run: `pnpm exec jest --watchAll=false`
Expected: PASS — all suites green, including every test added in Tasks 1–9.

Run: `pnpm exec tsc --noEmit --incremental false`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/pages/plan-your-trip/index.tsx src/__tests__/pages/plan-your-trip.test.tsx
git commit -m "feat: add /plan-your-trip page for the Journey Architect calculator"
```

- [ ] **Step 7: Manual browser verification**

Using the `run` skill's pattern for this project (Playwright against a local dev server, as already established in this codebase's hero3d work): start the dev server on a scratch port (not the user's own port 3000), navigate to `/plan-your-trip`, and verify:
1. Page renders with no console/page errors.
2. Moving the duration slider updates both the route timeline and the cost total live.
3. Changing adults/children/traveler type updates the cost total live.
4. "Lock in this Itinerary" opens the drawer; submitting with valid name/email shows the success state (mock or inspect the network call — do not require a live MongoDB connection for this check, since `dbConnect` failures are a separate, pre-existing infrastructure concern, not something this task introduces).
5. Mobile viewport (390×844): drawer renders as a bottom sheet, not a tiny centered modal; no horizontal overflow on the page.

Report any visual issues found; fix them in this same task before considering it done, following this project's established practice of verifying real UI in a real browser before claiming completion.

---

## Final Verification

- [ ] `pnpm exec jest --watchAll=false` passes in full.
- [ ] `pnpm exec tsc --noEmit --incremental false` has no errors.
- [ ] `pnpm exec eslint src/components/journeyArchitect src/lib/calculator-utils.ts src/data/journeyArchitectRates.ts src/pages/plan-your-trip` has no errors (confirm the project's actual lint invocation first — see prior session notes on a worktree/ESLint nesting quirk if this repo is being worked on inside a nested worktree).
- [ ] Manual browser verification (Task 9, Step 7) completed with no visual or console regressions, desktop and mobile.
