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
