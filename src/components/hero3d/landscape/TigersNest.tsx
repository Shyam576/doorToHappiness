import { useMemo } from 'react'
import * as THREE from 'three'
import { fbm } from './noise'

const ROCK_DARK = new THREE.Color('#564a3c')
const ROCK_MID = new THREE.Color('#8a7862')
const ROCK_LIGHT = new THREE.Color('#d4bd9c')
const MOSS = new THREE.Color('#44502f')

/**
 * A tall, jagged near-vertical cliff face, built the same way the mountains in Terrain.tsx are
 * (a noise-displaced mesh, vertex-colored by height) but narrower and steeper, with a slight
 * outward bulge partway up — the dramatic overhang the real cliff is known for.
 */
function cliffGeometry(width: number, height: number, seed: number): THREE.BufferGeometry {
  const segmentsX = 22
  const segmentsY = 40
  const positions: number[] = []
  const colors: number[] = []
  const indices: number[] = []
  const color = new THREE.Color()

  for (let iy = 0; iy <= segmentsY; iy++) {
    const v = iy / segmentsY
    const y = v * height
    // Bulges outward around the upper-middle, then tucks back in near the top — an overhang, not
    // a flat slope.
    const bulge = Math.sin(v * Math.PI * 0.85) * 2.2
    for (let ix = 0; ix <= segmentsX; ix++) {
      const u = ix / segmentsX
      const x = (u - 0.5) * width
      const jag = fbm(x * 0.35 + seed, v * 3 + seed, seed * 0.6) * 1.1
      const z = bulge + jag * (0.4 + v * 0.6)
      positions.push(x, y, z)

      color.copy(ROCK_DARK).lerp(MOSS, THREE.MathUtils.smoothstep(v, 0, 0.12))
      color.lerp(ROCK_MID, THREE.MathUtils.smoothstep(v, 0.1, 0.5))
      color.lerp(ROCK_LIGHT, THREE.MathUtils.smoothstep(v, 0.6, 1))
      colors.push(color.r, color.g, color.b)

      if (ix < segmentsX && iy < segmentsY) {
        const i = iy * (segmentsX + 1) + ix
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

const WALL_MATERIAL = new THREE.MeshStandardMaterial({ color: '#f2ede0', roughness: 0.85, flatShading: true })
const TRIM_MATERIAL = new THREE.MeshStandardMaterial({ color: '#8c3b2b', roughness: 0.8, flatShading: true })
const ROOF_MATERIAL = new THREE.MeshStandardMaterial({ color: '#d6a551', metalness: 0.5, roughness: 0.4, flatShading: true })
const WINDOW_MATERIAL = new THREE.MeshStandardMaterial({ color: '#2a1f18', roughness: 0.6 })

interface TempleBuildingProps {
  position: [number, number, number]
  width?: number
  height?: number
  depth?: number
}

/**
 * One building block of the monastery cluster: white walls with a maroon trim band (the two
 * colors that read as "Bhutanese temple" at a glance), a tapering two-stage gold pagoda roof, and
 * a thin gold finial — intentionally bold, simplified shapes so the silhouette stays legible even
 * when this whole model is a small, distant part of the frame.
 */
function TempleBuilding({ position, width = 2.6, height = 2.2, depth = 1.8 }: TempleBuildingProps): JSX.Element {
  const roofWidth = width * 1.22
  const roofWidth2 = width * 0.78

  return (
    <group position={position}>
      <mesh position={[0, height * 0.5, 0]} material={WALL_MATERIAL}>
        <boxGeometry args={[width, height, depth]} />
      </mesh>
      <mesh position={[0, height * 0.86, depth * 0.505]} material={TRIM_MATERIAL}>
        <boxGeometry args={[width * 0.98, height * 0.22, 0.04]} />
      </mesh>
      <mesh position={[0, height * 0.7, 0]} material={WINDOW_MATERIAL}>
        <boxGeometry args={[width * 0.32, height * 0.22, depth * 1.01]} />
      </mesh>
      <mesh position={[0, height + 0.12, 0]} material={ROOF_MATERIAL}>
        <boxGeometry args={[roofWidth, 0.22, roofWidth * 0.76]} />
      </mesh>
      <mesh position={[0, height + 0.42, 0]} material={ROOF_MATERIAL}>
        <boxGeometry args={[roofWidth2, 0.2, roofWidth2 * 0.76]} />
      </mesh>
      <mesh position={[0, height + 0.78, 0]} material={ROOF_MATERIAL}>
        <cylinderGeometry args={[0.03, 0.09, 0.5, 6]} />
      </mesh>
    </group>
  )
}

/**
 * A simplified, deliberately bold Taktshang-style ("Tiger's Nest") cliffside monastery: a cluster
 * of white, gold-roofed, maroon-trimmed temple buildings perched on ledges partway up a jagged
 * cliff. Sized and positioned to be recognizable in the hero's initial frame, not just on scroll —
 * see useReactiveCamera.ts for the scroll-driven camera pan toward it.
 */
export function TigersNest(): JSX.Element {
  const geometry = useMemo(() => cliffGeometry(16, 30, 61), [])

  return (
    <group position={[-37, -3, -45]}>
      <mesh geometry={geometry} receiveShadow>
        <meshStandardMaterial vertexColors roughness={0.95} flatShading />
      </mesh>
      <TempleBuilding position={[-1.6, 17.0, 3.2]} width={4.2} height={3.4} depth={2.6} />
      <TempleBuilding position={[2.2, 19.0, 2.7]} width={3.0} height={2.7} depth={2.0} />
      <TempleBuilding position={[0.2, 21.4, 2.2]} width={2.1} height={2.0} depth={1.5} />
    </group>
  )
}
