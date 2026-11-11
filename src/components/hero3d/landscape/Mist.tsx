import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const MIST_VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Soft vertical falloff (dense in the middle, fading to nothing at top/bottom) instead of a flat
// quad, so each mist layer reads as a drifting band rather than a hard-edged rectangle.
const MIST_FRAGMENT_SHADER = `
  varying vec2 vUv;
  uniform vec3 color;
  uniform float opacity;
  void main() {
    float falloff = 1.0 - abs(vUv.y - 0.5) * 2.0;
    falloff = smoothstep(0.0, 0.85, falloff);
    gl_FragColor = vec4(color, falloff * opacity);
  }
`

interface MistLayerConfig {
  z: number
  y: number
  width: number
  height: number
  color: string
  opacity: number
  driftSpeed: number
  driftRange: number
  phase: number
}

// Positioned low, in the empty gap between the foreground ridges (z ~3..15, see Terrain.tsx) and
// the first row of distant peaks (z ~-48 and beyond) — NOT at the same z/y as the peak geometry
// itself, which would just sit behind their opaque bodies and never be seen.
const LAYERS: MistLayerConfig[] = [
  { z: -14, y: 2.4, width: 150, height: 7, color: '#dcccbf', opacity: 0.3, driftSpeed: 0.035, driftRange: 6, phase: 0 },
  { z: -26, y: 3.4, width: 165, height: 9, color: '#d2c0b4', opacity: 0.24, driftSpeed: 0.024, driftRange: 8, phase: 2.1 },
  { z: -40, y: 4.6, width: 160, height: 10, color: '#c7b6ac', opacity: 0.2, driftSpeed: 0.019, driftRange: 7, phase: 4.3 },
]

function MistLayer({ z, y, width, height, color, opacity, driftSpeed, driftRange, phase }: MistLayerConfig): JSX.Element {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometry = useMemo(() => new THREE.PlaneGeometry(width, height), [width, height])
  const uniforms = useMemo(
    () => ({ color: { value: new THREE.Color(color) }, opacity: { value: opacity } }),
    [color, opacity]
  )

  useFrame((state) => {
    if (!meshRef.current) return
    const elapsed = state.clock.getElapsedTime()
    meshRef.current.position.x = Math.sin(elapsed * driftSpeed + phase) * driftRange
  })

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, y, z]} renderOrder={-10}>
      <shaderMaterial
        vertexShader={MIST_VERTEX_SHADER}
        fragmentShader={MIST_FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/** A few large, slowly-drifting translucent bands sitting between the mountain ranges, for a sense of valley mist at dawn. Desktop only — see HeroCanvas's isMobile gate. */
export function Mist(): JSX.Element {
  return (
    <>
      {LAYERS.map((layer, index) => (
        <MistLayer key={index} {...layer} />
      ))}
    </>
  )
}
