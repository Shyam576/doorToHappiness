import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { HimalayanLandscape } from './landscape/HimalayanLandscape'
import { useReactiveCamera } from './useReactiveCamera'

interface HeroCanvasProps {
  onReady: () => void
}

function CameraRig(): null {
  useReactiveCamera()
  return null
}

export function HeroCanvas({ onReady }: HeroCanvasProps): JSX.Element {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 7.5, 26], fov: 44, near: 0.1, far: 260 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.12
        onReady()
      }}
    >
      <color attach="background" args={['#b18a7e']} />
      <fogExp2 attach="fog" args={['#c3a092', 0.006]} />
      <hemisphereLight args={['#c8d9e6', '#26312b', 1.55]} />
      <directionalLight position={[-28, 23, 5]} intensity={3.1} color="#ffd19a" />
      <directionalLight position={[20, 10, -35]} intensity={0.75} color="#8ca5b2" />
      <HimalayanLandscape />
      <CameraRig />
    </Canvas>
  )
}
