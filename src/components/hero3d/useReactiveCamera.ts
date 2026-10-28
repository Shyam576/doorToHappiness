import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import type { PerspectiveCamera } from 'three'

const BASE_CAMERA_Y = 7.5
const IDLE_THRESHOLD_MS = 4000
const MOBILE_BREAKPOINT = 720
// Shifts the camera right on mobile so the chorten (off-center in the full scene) stays in frame
// despite the narrower field of view.
const MOBILE_FRAME_OFFSET_X = 3

function isMobileViewport(): boolean {
  return window.innerWidth < MOBILE_BREAKPOINT
}

/**
 * Drives the camera with a gentle, non-interactive drift: it leans toward the mouse position and
 * dollies into the scene on scroll, with a slow idle sway when there's been no input for a few
 * seconds. Pointer and scroll are tracked via window-level listeners (not react-three-fiber's
 * built-in pointer state, which only updates from events on the canvas's own DOM wrapper and can be
 * starved by other elements stacked above it) and mobile gets a wider frame offset plus a slightly
 * wider field of view so the chorten stays in view on a narrow screen.
 */
export function useReactiveCamera(): void {
  const { camera } = useThree()
  const perspectiveCamera = camera as PerspectiveCamera

  const scrollRef = useRef(0)
  const pointerRef = useRef({ x: 0, y: 0 })
  const lastInputRef = useRef(performance.now())
  const frameOffsetXRef = useRef(isMobileViewport() ? MOBILE_FRAME_OFFSET_X : 0)
  const targetRef = useRef({ x: frameOffsetXRef.current, y: 7.3, z: -28 })

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = Math.min(1, window.scrollY / Math.max(1, window.innerHeight * 0.9))
      lastInputRef.current = performance.now()
    }
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      pointerRef.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * 2,
      }
      lastInputRef.current = performance.now()
    }
    const handleResize = () => {
      const offsetX = isMobileViewport() ? MOBILE_FRAME_OFFSET_X : 0
      frameOffsetXRef.current = offsetX
      perspectiveCamera.fov = isMobileViewport() ? 48 : 44
      perspectiveCamera.updateProjectionMatrix()
    }

    // Set the initial framing immediately (no lerp-in) so mobile starts correctly composed.
    const initialOffsetX = frameOffsetXRef.current
    camera.position.x = initialOffsetX
    targetRef.current.x = initialOffsetX
    handleResize()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [perspectiveCamera])

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()
    const idle = performance.now() - lastInputRef.current > IDLE_THRESHOLD_MS
    const frameOffsetX = frameOffsetXRef.current
    const aimX = pointerRef.current.x * 0.55 + (idle ? Math.sin(elapsed * 0.09) * 0.15 : 0)
    const aimY = 7.3 - pointerRef.current.y * 0.18 - scrollRef.current * 1.1

    camera.position.x += (frameOffsetX + aimX - camera.position.x) * 0.012
    camera.position.y += (BASE_CAMERA_Y + aimY * 0.04 - camera.position.y) * 0.01

    const target = targetRef.current
    target.x += (frameOffsetX + aimX * 0.42 - target.x) * 0.008
    target.y += (aimY - target.y) * 0.008
    target.z += (-28 + scrollRef.current * 7 - target.z) * 0.01

    camera.lookAt(target.x, target.y, target.z)
  })
}
