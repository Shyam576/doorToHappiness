import { useMemo } from 'react'
import * as THREE from 'three'

interface TempleBlockProps {
  position: [number, number, number]
  scale?: number
  roofColor?: string
  wallColor?: string
}

function TempleBlock({ position, scale = 1, roofColor = '#b5872e', wallColor = '#f5f1e6' }: TempleBlockProps) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 1, 1]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
      <mesh position={[0, 1.15, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[1.05, 0.6, 4]} />
        <meshStandardMaterial color={roofColor} />
      </mesh>
    </group>
  )
}

export function TigersNestModel(): JSX.Element {
  const cliffGeometry = useMemo(() => {
    const geometry = new THREE.BoxGeometry(6, 10, 4, 1, 1, 1)
    geometry.translate(0, -2, 0)
    return geometry
  }, [])

  return (
    <group position={[0, -1.5, 0]}>
      {/* Cliff face */}
      <mesh geometry={cliffGeometry} rotation={[0, 0, -0.12]} receiveShadow>
        <meshStandardMaterial color="#4a4036" roughness={1} />
      </mesh>

      {/* Ledge the monastery sits on */}
      <mesh position={[1.1, 3.1, 1.6]} rotation={[0, 0, -0.12]} receiveShadow>
        <boxGeometry args={[3, 0.3, 2]} />
        <meshStandardMaterial color="#5c5244" roughness={1} />
      </mesh>

      {/* Temple cluster, loosely mirroring Taktsang's tiered buildings */}
      <TempleBlock position={[0.4, 3.3, 1.6]} scale={1} />
      <TempleBlock position={[1.6, 3.3, 1.9]} scale={0.75} roofColor="#8c3b2b" />
      <TempleBlock position={[1.1, 4.0, 1.4]} scale={0.55} roofColor="#b5872e" />
    </group>
  )
}
