import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

const BASE_CAMERA_X = 0
const BASE_CAMERA_Y = 1.2
const MAX_SCROLL_INFLUENCE = 400

export function useReactiveCamera(): void {
  const { camera } = useThree()
  const scrollRef = useRef(window.scrollY)
  const pointerRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      pointerRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -((event.clientY / window.innerHeight) * 2 - 1),
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  useFrame(() => {
    const clampedScroll = Math.min(scrollRef.current, MAX_SCROLL_INFLUENCE)

    const targetX = BASE_CAMERA_X + pointerRef.current.x * 0.6
    const targetY = BASE_CAMERA_Y + pointerRef.current.y * 0.3 - clampedScroll * 0.0015

    camera.position.x += (targetX - camera.position.x) * 0.05
    camera.position.y += (targetY - camera.position.y) * 0.05
    camera.lookAt(0, 2, 0)
  })
}
