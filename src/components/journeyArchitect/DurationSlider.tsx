import { MIN_DURATION_DAYS, MAX_DURATION_DAYS } from '../../lib/calculator-utils'

interface DurationSliderProps {
  value: number
  onChange: (days: number) => void
}

export function DurationSlider({ value, onChange }: DurationSliderProps) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <label htmlFor="ja-duration" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-600">
          Trip length
        </label>
        <span className="font-heading text-3xl font-medium text-emerald-900">
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
        className="h-11 w-full cursor-pointer accent-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
        aria-valuemin={MIN_DURATION_DAYS}
        aria-valuemax={MAX_DURATION_DAYS}
        aria-valuenow={value}
      />
      <div className="flex justify-between text-xs text-stone-600">
        <span>{MIN_DURATION_DAYS} days</span>
        <span>{MAX_DURATION_DAYS} days</span>
      </div>
    </div>
  )
}
