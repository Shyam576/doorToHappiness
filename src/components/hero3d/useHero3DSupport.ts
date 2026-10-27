import { useEffect, useState } from 'react'
import { detectHero3DSupport } from './detectHero3DSupport'

export interface Hero3DSupport {
  supported: boolean
  checked: boolean
}

export function useHero3DSupport(): Hero3DSupport {
  const [state, setState] = useState<Hero3DSupport>({ supported: false, checked: false })

  useEffect(() => {
    setState({ supported: detectHero3DSupport(), checked: true })
  }, [])

  return state
}
