import { RouteStop } from '../../lib/calculator-utils'
import { Reveal } from '../motion/Reveal'

interface RouteTimelineProps {
  stops: RouteStop[]
}

export function RouteTimeline({ stops }: RouteTimelineProps) {
  return (
    <ol className="relative">
      {stops.map((stop, i) => (
        <Reveal as="li" key={stop.day} delay={Math.min(i, 5) * 70} className="relative flex items-start gap-5 pb-7 last:pb-0">
          {i < stops.length - 1 && (
            <span className="absolute left-[19px] top-10 h-[calc(100%-2.5rem)] w-px bg-stone-300" aria-hidden="true" />
          )}
          <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-emerald-900 bg-brand-ivory font-heading text-base font-medium text-emerald-900">
            {stop.day}
          </div>
          <div className="pt-1.5">
            <p className="font-heading text-xl font-medium leading-snug text-stone-900">{stop.location}</p>
            <p className="mt-1 text-sm leading-relaxed text-stone-600">{stop.description}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  )
}
