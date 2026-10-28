import { useMemo } from 'react'
import * as THREE from 'three'
import { fbm, hash } from './noise'

const PEAKS: Array<[x: number, z: number, radius: number, height: number, seed: number]> = [
  [-36, -48, 17, 27, 2],
  [-19, -59, 24, 33, 4],
  [2, -64, 19, 50, 7],
  [24, -54, 27, 37, 10],
  [44, -66, 16, 24, 14],
  [-52, -69, 25, 40, 16],
  [-41, -101, 21, 25, 21],
  [-9, -114, 29, 36, 23],
  [22, -106, 20, 22, 26],
  [47, -121, 28, 31, 29],
]

const color = new THREE.Color()
const PINE = new THREE.Color('#17382e')
const GREEN = new THREE.Color('#315342')
const ROCK = new THREE.Color('#555b5b')
const SNOW = new THREE.Color('#edf0ec')

function mountainGeometry(radius: number, height: number, seed: number): THREE.BufferGeometry {
  const rings = 52
  const sides = 72
  const positions: number[] = []
  const colors: number[] = []
  const indices: number[] = []

  for (let r = 0; r <= rings; r++) {
    const t = r / rings
    const radial = t * radius
    for (let s = 0; s <= sides; s++) {
      const a = (s / sides) * Math.PI * 2
      const jag = fbm(Math.cos(a) * 2.2 + seed, Math.sin(a) * 2.2, seed * 0.7) * 0.12 + Math.sin(a * 7 + seed) * 0.025
      const rr = radial * (1 + jag * t)
      const ridge = fbm(Math.cos(a) * 3 + seed, t * 2.2, Math.sin(a) * 3) * 0.19
      let y = height * Math.pow(Math.max(0, 1 - t), 1.08) + ridge * height * Math.sin(t * Math.PI) * 0.8
      y += fbm(Math.cos(a) * 5 + seed, t * 4, Math.sin(a) * 5) * height * 0.055 * Math.sin(t * Math.PI)
      y = Math.max(0.015, y)
      positions.push(Math.cos(a) * rr, y, Math.sin(a) * rr)

      const elevation = y / height
      const snow = THREE.MathUtils.smoothstep(elevation + (hash(s, r, seed) - 0.5) * 0.12, 0.64, 0.86)
      const rock = THREE.MathUtils.smoothstep(elevation, 0.22, 0.55)
      color.copy(PINE).lerp(GREEN, THREE.MathUtils.smoothstep(elevation, 0.02, 0.24)).lerp(ROCK, rock).lerp(SNOW, snow)
      colors.push(color.r, color.g, color.b)

      if (r < rings && s < sides) {
        const i = r * (sides + 1) + s
        const n = i + sides + 1
        indices.push(i, i + 1, n, n + 1, n, i + 1)
      }
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

function ridgeGeometry(
  width: number,
  depth: number,
  segmentsX: number,
  segmentsZ: number,
  yBase: number,
  seed: number,
  tint: string
): THREE.BufferGeometry {
  const positions: number[] = []
  const colors: number[] = []
  const indices: number[] = []
  const base = new THREE.Color(tint)
  const dark = new THREE.Color('#12231e')

  for (let iz = 0; iz <= segmentsZ; iz++) {
    for (let ix = 0; ix <= segmentsX; ix++) {
      const x = (ix / segmentsX - 0.5) * width
      const z = -(iz / segmentsZ) * depth
      const y = yBase + fbm(x * 0.055, z * 0.04, seed) * 1.5 + Math.sin(x * 0.045 + seed) * 0.7
      positions.push(x, y, z)

      const mix = THREE.MathUtils.clamp((y - yBase + 2) / 5, 0, 1)
      color.copy(dark).lerp(base, mix)
      colors.push(color.r, color.g, color.b)

      if (ix < segmentsX && iz < segmentsZ) {
        const i = iz * (segmentsX + 1) + ix
        const n = i + segmentsX + 1
        indices.push(i, i + 1, n, i + 1, n + 1, n)
      }
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

/** The Himalayan peaks and the two foreground ridges that frame them, both noise-displaced and vertex-colored by elevation. */
export function Terrain(): JSX.Element {
  const mountainGeometries = useMemo(() => PEAKS.map(([, , radius, height, seed]) => mountainGeometry(radius, height, seed)), [])
  const ridge1Geometry = useMemo(() => ridgeGeometry(190, 58, 100, 36, 0, 22, '#31523a'), [])
  const ridge2Geometry = useMemo(() => ridgeGeometry(175, 38, 90, 24, -1.3, 42, '#203e30'), [])

  return (
    <group>
      {PEAKS.map(([x, z], index) => (
        <mesh key={`${x}-${z}`} geometry={mountainGeometries[index]} position={[x, 0, z]}>
          <meshStandardMaterial vertexColors roughness={0.96} metalness={0} flatShading />
        </mesh>
      ))}
      <mesh geometry={ridge1Geometry} position={[0, 0, 3]}>
        <meshStandardMaterial vertexColors roughness={1} flatShading />
      </mesh>
      <mesh geometry={ridge2Geometry} position={[0, 0, 15]}>
        <meshStandardMaterial vertexColors roughness={1} flatShading />
      </mesh>
    </group>
  )
}
