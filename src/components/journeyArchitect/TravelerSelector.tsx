import { TravelerType, MIN_ADULTS, MIN_CHILDREN } from '../../lib/calculator-utils'

const labelCls = 'mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-600'
const stepBtn =
  'flex h-11 w-11 items-center justify-center rounded-full border border-stone-400 text-lg text-stone-800 transition-colors hover:border-emerald-900 hover:bg-emerald-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900'

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
  return (
    <div className="space-y-8">
      <div>
        <p className={labelCls}>Travelers</p>
        <div className="flex items-center gap-10">
          <Stepper label="Adults" value={adults} min={MIN_ADULTS} onChange={onAdultsChange} />
          <Stepper label="Children" value={childrenCount} min={MIN_CHILDREN} onChange={onChildrenCountChange} />
        </div>
      </div>
      <div>
        <p id="ja-type-label" className={labelCls}>Traveling as</p>
        <div role="radiogroup" aria-label="Traveler type" className="grid grid-cols-2 gap-3">
          {TRAVELER_TYPE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={travelerType === option.value}
              onClick={() => onTravelerTypeChange(option.value)}
              className={`min-h-[48px] border px-4 py-3 text-left text-base font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900 ${
                travelerType === option.value
                  ? 'border-emerald-900 bg-emerald-900 text-white'
                  : 'border-stone-300 text-stone-800 hover:border-emerald-900'
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
      <p className="mb-1 text-sm text-stone-600">{label}</p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          className={stepBtn}
        >
          −
        </button>
        <span className="w-8 text-center font-heading text-2xl font-medium text-stone-900">{value}</span>
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          onClick={() => onChange(value + 1)}
          className={stepBtn}
        >
          +
        </button>
      </div>
    </div>
  )
}
