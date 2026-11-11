import { useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { HimalayanLandscape } from './landscape/HimalayanLandscape'
import { useReactiveCamera } from './useReactiveCamera'

interface HeroCanvasProps {
  onReady: () => void
  /** Incrementing counter — each increment starts a fresh "fly to the Tiger's Nest and back" camera animation. See useReactiveCamera.ts. */
  revealTrigger?: number
}

interface CameraRigProps {
  revealTrigger?: number
}

function CameraRig({ revealTrigger }: CameraRigProps): null {
  useReactiveCamera(revealTrigger)
  return null
}

const MOBILE_BREAKPOINT = 720

export function HeroCanvas({ onReady, revealTrigger }: HeroCanvasProps): JSX.Element {
  // Decided once at mount, not resize-reactive: this only gates a one-time quality tier
  // (shadows/mist on vs. off), not something that needs to track live viewport changes.
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT)

  // A directional light's shadow camera points at (0,0,0) by default. The chorten — the only
  // thing we want casting a visible shadow — sits well away from there, so without an explicit
  // target the shadow frustum centers on empty ground and the chorten's shadow falls outside it.
  const sunTarget = useMemo(() => {
    const target = new THREE.Object3D()
    target.position.set(8.5, 0, 5)
    return target
  }, [])

  return (
    <Canvas
      shadows={isMobile ? false : 'soft'}
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
      <primitive object={sunTarget} />
      <directionalLight
        position={[-28, 23, 5]}
        intensity={3.1}
        color="#ffd19a"
        castShadow={!isMobile}
        target={sunTarget}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-camera-near={1}
        shadow-camera-far={60}
        shadow-bias={-0.0015}
      />
      <directionalLight position={[20, 10, -35]} intensity={0.75} color="#8ca5b2" />
      <HimalayanLandscape isDesktop={!isMobile} />
      <CameraRig revealTrigger={revealTrigger} />
    </Canvas>
  )
}
