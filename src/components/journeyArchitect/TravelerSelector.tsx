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
