import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Close enough to stay clearly in front of the foreground ridge terrain (which would otherwise
// bury or occlude anything placed behind its near edge around z=3) and raised and shifted right so
// it sits above and beside the page's centered hero text, rather than directly behind it.
const CHORTEN_POSITION: [number, number, number] = [7, 3, 5]
const CHORTEN_SCALE = 1

const STONE_MATERIAL = new THREE.MeshStandardMaterial({ color: '#eee8d7', roughness: 0.88, flatShading: true })
const WHITE_MATERIAL = new THREE.MeshStandardMaterial({ color: '#f4efe2', roughness: 0.8, flatShading: true })
const GOLD_MATERIAL = new THREE.MeshStandardMaterial({ color: '#d6a551', metalness: 0.55, roughness: 0.37, flatShading: true })
const NICHE_MATERIAL = new THREE.MeshStandardMaterial({ color: '#8b4532', roughness: 0.85 })

const BELL_PROFILE = [
  new THREE.Vector2(0.78, 0),
  new THREE.Vector2(0.98, 0.16),
  new THREE.Vector2(1.03, 0.42),
  new THREE.Vector2(0.88, 0.72),
  new THREE.Vector2(0.61, 1.02),
  new THREE.Vector2(0.48, 1.3),
  new THREE.Vector2(0.52, 1.48),
  new THREE.Vector2(0.68, 1.65),
  new THREE.Vector2(0.72, 1.84),
  new THREE.Vector2(0.55, 2.02),
  new THREE.Vector2(0, 2.02),
]

/** The stepped stone plinth, white-washed dome, and gold spire of a Bhutanese chorten. */
function ChortenBody(): JSX.Element {
  const bellGeometry = useMemo(() => new THREE.LatheGeometry(BELL_PROFILE, 10), [])

  return (
    <group>
      <mesh position={[0, 0.16, 0]} material={STONE_MATERIAL}>
        <boxGeometry args={[3.7, 0.28, 3.1]} />
      </mesh>
      <mesh position={[0, 0.43, 0]} material={WHITE_MATERIAL}>
        <boxGeometry args={[3.15, 0.28, 2.65]} />
      </mesh>
      <mesh position={[0, 0.72, 0]} material={STONE_MATERIAL}>
        <boxGeometry args={[2.65, 0.32, 2.25]} />
      </mesh>
      <mesh position={[0, 0.98, 0]} material={WHITE_MATERIAL}>
        <boxGeometry args={[2.32, 0.22, 1.98]} />
      </mesh>
      <mesh position={[0, 1.08, 0]} geometry={bellGeometry} material={WHITE_MATERIAL} />
      <mesh position={[0, 3.28, 0]} material={WHITE_MATERIAL}>
        <boxGeometry args={[1.34, 0.68, 1.2]} />
      </mesh>
      <mesh position={[0, 2.94, 0]} material={GOLD_MATERIAL}>
        <boxGeometry args={[1.48, 0.09, 1.32]} />
      </mesh>
      <mesh position={[0, 4.35, 0]} material={GOLD_MATERIAL}>
        <cylinderGeometry args={[0.14, 0.43, 1.48, 8]} />
      </mesh>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0, 3.72 + i * 0.29, 0]} material={GOLD_MATERIAL}>
          <torusGeometry args={[0.38 - i * 0.055, 0.045, 5, 10]} />
        </mesh>
      ))}
      <mesh position={[0, 5.16, 0]} material={GOLD_MATERIAL}>
        <sphereGeometry args={[0.14, 8, 6]} />
      </mesh>
      {/* A small warm front niche gives the white body a recognizable Bhutanese detail. */}
      <mesh position={[0, 1.62, 1.015]} material={GOLD_MATERIAL}>
        <boxGeometry args={[0.58, 0.78, 0.055]} />
      </mesh>
      <mesh position={[0, 1.62, 1.055]} material={NICHE_MATERIAL}>
        <boxGeometry args={[0.4, 0.62, 0.07]} />
      </mesh>
    </group>
  )
}

// Local coordinates, relative to the same group the chorten body sits in, so the flags move and
// scale together with it.
const FLAG_COLORS = ['#277ac1', '#f2eee2', '#c93c35', '#318653', '#e2bb36']
const FLAG_COUNT = 25
// Shortened from the original -4.55 reach: the longer line stretched the flags/pole far enough
// left to overlap the page's "Explore Tours" button.
const FLAG_START = new THREE.Vector3(-2.3, 5.6, 0.5)
const FLAG_END = new THREE.Vector3(-0.25, 4.8, 1.0)

interface FlagMeshData {
  geometry: THREE.BufferGeometry
  restPositions: Float32Array
  vertexSegment: Int32Array
  line: THREE.Vector3[]
}

function buildFlagMesh(): FlagMeshData {
  const line: THREE.Vector3[] = []
  for (let i = 0; i <= FLAG_COUNT; i++) {
    const t = i / FLAG_COUNT
    line.push(new THREE.Vector3().lerpVectors(FLAG_START, FLAG_END, t))
  }

  const positions: number[] = []
  const colors: number[] = []
  const vertexSegment: number[] = []
  const width = 0.38
  const height = 0.72

  for (let i = 0; i < FLAG_COUNT; i++) {
    const { x, y, z } = line[i]
    const { x: nx, y: ny, z: nz } = line[i + 1]
    const midX = (x + nx) / 2
    const midY = (y + ny) / 2
    const midZ = (z + nz) / 2
    const colorIndex = i % FLAG_COLORS.length
    // Two triangles make a tapered pennant.
    const verts: [number, number, number][] = [
      [x, y, z],
      [x + width, y - 0.015, z],
      [midX + width * 0.34, midY - height, midZ],
      [x + width, y - 0.015, z],
      [nx + width, ny, nz],
      [midX + width * 0.34, midY - height, midZ],
    ]
    const flagColor = new THREE.Color(FLAG_COLORS[colorIndex])
    for (const vertex of verts) {
      positions.push(...vertex)
      colors.push(flagColor.r, flagColor.g, flagColor.b)
      vertexSegment.push(i)
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

  return {
    geometry,
    restPositions: Float32Array.from(positions),
    vertexSegment: Int32Array.from(vertexSegment),
    line,
  }
}

/** A line of five-color prayer flags between two poles, animated with a gentle wind sway each frame. */
function PrayerFlags(): JSX.Element {
  const { geometry, restPositions, vertexSegment, line } = useMemo(buildFlagMesh, [])
  const cordPoints = useMemo(() => line, [line])

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()
    const positionAttribute = geometry.attributes.position
    const vertexCount = vertexSegment.length

    for (let i = 0; i < vertexCount; i++) {
      const j = i * 3
      const segment = vertexSegment[i]
      const phase = segment * 0.34 + elapsed * 1.45
      const restX = restPositions[j]
      const restY = restPositions[j + 1]
      const restZ = restPositions[j + 2]
      const drop = Math.max(0, restY - line[Math.min(FLAG_COUNT - 1, segment)].y)

      positionAttribute.setXYZ(
        i,
        restX + Math.sin(phase) * 0.055,
        restY + Math.sin(phase + restX * 0.8) * (0.045 + drop * 0.035),
        restZ + Math.sin(phase + restX * 0.55) * (0.1 + drop * 0.11)
      )
    }

    positionAttribute.needsUpdate = true
    geometry.computeVertexNormals()
  })

  return (
    <>
      <mesh geometry={geometry}>
        <meshBasicMaterial vertexColors side={THREE.DoubleSide} />
      </mesh>
      {/* Fine dark cord between the poles. */}
      <line>
        <bufferGeometry attach="geometry" onUpdate={(self) => self.setFromPoints(cordPoints)} />
        <lineBasicMaterial color="#403c35" />
      </line>
      {[FLAG_START, FLAG_END].map((point, index) => (
        <mesh key={index} position={[point.x, point.y - 2.8, point.z]} material={GOLD_MATERIAL}>
          <cylinderGeometry args={[0.035, 0.05, 6, 5]} />
        </mesh>
      ))}
    </>
  )
}

/** A chorten with prayer flags, nestled among the mountains as a recognizable landscape feature. */
export function Chorten(): JSX.Element {
  return (
    <group position={CHORTEN_POSITION} scale={CHORTEN_SCALE}>
      <ChortenBody />
      <PrayerFlags />
    </group>
  )
}
