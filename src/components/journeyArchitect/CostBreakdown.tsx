import { CostBreakdown as CostBreakdownData } from '../../lib/calculator-utils'

interface CostBreakdownProps {
  breakdown: CostBreakdownData
}

export function CostBreakdown({ breakdown }: CostBreakdownProps) {
  const lineItems = [breakdown.sdf, breakdown.accommodation, breakdown.guide, breakdown.transit]

  return (
    <div className="bg-emerald-950 p-6 text-white sm:p-8">
      <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">
        <span className="h-px w-10 bg-amber-300" aria-hidden="true" />
        Live estimate
      </p>
      <ul className="divide-y divide-white/10">
        {lineItems.map((item) => (
          <li key={item.label} className="flex justify-between gap-4 py-3 text-sm text-white/80">
            <span>{item.label}</span>
            <span className="tabular-nums text-white">${item.amountUsd.toLocaleString()}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-amber-300/50 pt-5">
        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/80">Estimated total</span>
        <span key={breakdown.totalUsd} className="animate-page-in font-heading text-4xl font-medium tabular-nums text-amber-200 sm:text-5xl">
          ${breakdown.totalUsd.toLocaleString()}
        </span>
      </div>
      <p className="mt-4 border-l-2 border-amber-300 pl-3 text-sm leading-relaxed text-white/80">
        Estimate only — your final quote will be confirmed by our team.
      </p>
    </div>
  )
}
