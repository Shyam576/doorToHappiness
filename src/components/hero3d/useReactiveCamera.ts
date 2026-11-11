import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import type { PerspectiveCamera } from 'three'

const BASE_CAMERA_Y = 7.5
const IDLE_THRESHOLD_MS = 4000
const MOBILE_BREAKPOINT = 720
// Shifts the camera right on mobile so the chorten (off-center in the full scene) stays in frame
// despite the narrower field of view.
const MOBILE_FRAME_OFFSET_X = 4.5

// Approximate world position of the temple cluster in TigersNest.tsx (the group's own position
// applied to the temple buildings' local coordinates) — see "Discover Taktshang" below.
const TIGERS_NEST_TARGET = { x: -36.7, y: 16.1, z: -42.3 }

// Phase durations (seconds) for the self-contained reveal: ease in, hold, ease back out.
const REVEAL_IN = 3.5
const REVEAL_HOLD = 5.5
const REVEAL_OUT = 9

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t
const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

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
 *
 * `revealTrigger` is an incrementing counter (not a boolean) — every increment starts a fresh,
 * self-contained fly-to-the-Tiger's-Nest-and-back animation, entirely decoupled from scroll. This
 * replaces an earlier scroll-tied version of the same idea: tying it to scroll meant the reveal had
 * almost no visible effect in practice, because the hero canvas scrolls off-screen with normal page
 * flow well before a scroll-driven pan could complete. A click-triggered animation has no such race.
 */
export function useReactiveCamera(revealTrigger = 0): void {
  const { camera } = useThree()
  const perspectiveCamera = camera as PerspectiveCamera

  const scrollRef = useRef(0)
  const pointerRef = useRef({ x: 0, y: 0 })
  const lastInputRef = useRef(performance.now())
  const frameOffsetXRef = useRef(isMobileViewport() ? MOBILE_FRAME_OFFSET_X : 0)
  const targetRef = useRef({ x: frameOffsetXRef.current, y: 7.3, z: -28 })
  const revealStartRef = useRef<number | null>(null)

  useEffect(() => {
    if (revealTrigger > 0) {
      revealStartRef.current = performance.now()
    }
  }, [revealTrigger])

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

    const normalPositionX = frameOffsetX + aimX
    const normalTargetX = frameOffsetX + aimX * 0.42
    const normalTargetY = aimY
    const normalTargetZ = -28 + scrollRef.current * 7

    let desiredPositionX = normalPositionX
    let desiredTargetX = normalTargetX
    let desiredTargetY = normalTargetY
    let desiredTargetZ = normalTargetZ

    if (revealStartRef.current !== null) {
      const revealElapsed = (performance.now() - revealStartRef.current) / 1000
      if (revealElapsed >= REVEAL_OUT) {
        revealStartRef.current = null
      } else {
        const revealBlend =
          revealElapsed < REVEAL_IN
            ? smoothstep(0, REVEAL_IN, revealElapsed)
            : revealElapsed < REVEAL_HOLD
              ? 1
              : 1 - smoothstep(REVEAL_HOLD, REVEAL_OUT, revealElapsed)

        desiredPositionX = lerp(normalPositionX, TIGERS_NEST_TARGET.x * 0.5, revealBlend)
        desiredTargetX = lerp(normalTargetX, TIGERS_NEST_TARGET.x, revealBlend)
        desiredTargetY = lerp(normalTargetY, TIGERS_NEST_TARGET.y, revealBlend)
        desiredTargetZ = lerp(normalTargetZ, TIGERS_NEST_TARGET.z, revealBlend)
      }
    }

    camera.position.x += (desiredPositionX - camera.position.x) * 0.012
    camera.position.y += (BASE_CAMERA_Y + aimY * 0.04 - camera.position.y) * 0.01

    const target = targetRef.current
    target.x += (desiredTargetX - target.x) * 0.008
    target.y += (desiredTargetY - target.y) * 0.008
    target.z += (desiredTargetZ - target.z) * 0.01

    camera.lookAt(target.x, target.y, target.z)
  })
}
