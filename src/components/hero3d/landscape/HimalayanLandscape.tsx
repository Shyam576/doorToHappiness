import { ProceduralSky } from './ProceduralSky'
import { Terrain } from './Terrain'
import { Forest } from './Forest'
import { Chorten } from './Chorten'
import { AtmosphericParticles } from './AtmosphericParticles'
import { Mist } from './Mist'
import { TigersNest } from './TigersNest'

interface HimalayanLandscapeProps {
  /** Skips the drifting mist layers and the Tiger's Nest cliff model on narrow viewports — extra geometry/draw calls that matter less there than the cost of rendering them. */
  isDesktop: boolean
}

/** A full procedural Himalayan landscape: dawn sky, noise-displaced mountains and ridges, a pine forest, a chorten with prayer flags, a distant Tiger's Nest-style cliffside monastery (desktop only), drifting atmospheric particles, and (desktop only) drifting mist layers between the ranges. */
export function HimalayanLandscape({ isDesktop }: HimalayanLandscapeProps): JSX.Element {
  return (
    <>
      <ProceduralSky />
      <Terrain />
      <Forest />
      <Chorten />
      {isDesktop && <TigersNest />}
      <AtmosphericParticles />
      {isDesktop && <Mist />}
    </>
  )
}
