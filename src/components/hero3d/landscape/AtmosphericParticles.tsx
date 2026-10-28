import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 520

interface ParticleField {
  geometry: THREE.BufferGeometry
  positions: Float32Array
  velocities: Float32Array
}

function buildParticleField(): ParticleField {
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const velocities = new Float32Array(PARTICLE_COUNT * 3)

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 105
    positions[i * 3 + 1] = Math.random() * 30
    positions[i * 3 + 2] = -55 + Math.random() * 85
    velocities[i * 3] = (Math.random() - 0.5) * 0.018
    velocities[i * 3 + 1] = 0.006 + Math.random() * 0.018
    velocities[i * 3 + 2] = 0
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  return { geometry, positions, velocities }
}

/** Tiny drifting dust/snow flecks that give the air a sense of scale and movement, all in a single draw call. */
export function AtmosphericParticles(): JSX.Element {
  const { geometry, positions, velocities } = useMemo(buildParticleField, [])
  const elapsedRef = useRef(0)

  useFrame((_state, delta) => {
    elapsedRef.current += delta
    const elapsed = elapsedRef.current
    const positionAttribute = geometry.attributes.position

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const j = i * 3
      positions[j] += velocities[j] + Math.sin(elapsed * 0.25 + i) * 0.002
      positions[j + 1] += velocities[j + 1]
      if (positions[j + 1] > 31) {
        positions[j + 1] = 0
        positions[j] = (Math.random() - 0.5) * 105
      }
    }

    positionAttribute.needsUpdate = true
  })

  return (
    <points geometry={geometry}>
      <pointsMaterial color="#ffe7c2" size={0.095} transparent opacity={0.58} depthWrite={false} sizeAttenuation />
    </points>
  )
}
