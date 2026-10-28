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
