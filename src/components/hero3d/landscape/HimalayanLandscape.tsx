import { ProceduralSky } from './ProceduralSky'
import { Terrain } from './Terrain'
import { Forest } from './Forest'
import { Chorten } from './Chorten'
import { AtmosphericParticles } from './AtmosphericParticles'

/** A full procedural Himalayan landscape: dawn sky, noise-displaced mountains and ridges, a pine forest, a chorten with prayer flags, and drifting atmospheric particles. */
export function HimalayanLandscape(): JSX.Element {
  return (
    <>
      <ProceduralSky />
      <Terrain />
      <Forest />
      <Chorten />
      <AtmosphericParticles />
    </>
  )
}
