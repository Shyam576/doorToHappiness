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
