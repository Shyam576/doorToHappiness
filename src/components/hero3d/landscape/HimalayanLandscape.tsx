import { ProceduralSky } from './ProceduralSky'
import { Terrain } from './Terrain'
import { Forest } from './Forest'
import { Chorten } from './Chorten'
import { AtmosphericParticles } from './AtmosphericParticles'
import { Mist } from './Mist'

interface HimalayanLandscapeProps {
  /** Skips the drifting mist layers on narrow viewports — a few extra transparent draw calls that matter less there than the cost of rendering them. */
  showMist: boolean
}

/** A full procedural Himalayan landscape: dawn sky, noise-displaced mountains and ridges, a pine forest, a chorten with prayer flags, drifting atmospheric particles, and (desktop only) drifting mist layers between the ranges. */
export function HimalayanLandscape({ showMist }: HimalayanLandscapeProps): JSX.Element {
  return (
    <>
      <ProceduralSky />
      <Terrain />
      <Forest />
      <Chorten />
      <AtmosphericParticles />
      {showMist && <Mist />}
    </>
  )
}
