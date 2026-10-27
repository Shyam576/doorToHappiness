import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { TigersNestModel } from './TigersNestModel'
import { useReactiveCamera } from './useReactiveCamera'

interface HeroCanvasProps {
  onReady: () => void
}

function CameraRig(): null {
  useReactiveCamera()
  return null
}

interface MistPatchProps {
  position: [number, number, number]
  size: [number, number]
  baseOpacity: number
  rotation?: [number, number, number]
}

function MistPatch({ position, size, baseOpacity, rotation = [0, 0, 0] }: MistPatchProps) {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.opacity = baseOpacity + Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshBasicMaterial ref={materialRef} color="#e8eef2" transparent opacity={baseOpacity} depthWrite={false} />
    </mesh>
  )
}

export function HeroCanvas({ onReady }: HeroCanvasProps): JSX.Element {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.2, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={() => onReady()}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.1} color="#ffe9c7" />
      <fog attach="fog" args={['#8fa8bf', 5, 18]} />
      <MistPatch position={[-3, 4, -4]} size={[6, 3]} baseOpacity={0.25} rotation={[0, 0.3, 0]} />
      <MistPatch position={[3, 2.5, -3]} size={[5, 2.5]} baseOpacity={0.18} rotation={[0, -0.3, 0]} />
      <TigersNestModel />
      <CameraRig />
    </Canvas>
  )
}
