interface NetworkInformationLike {
  saveData?: boolean
}

export function detectHero3DSupport(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false
  }

  const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection
  if (connection?.saveData) {
    return false
  }

  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) {
      return false
    }
  } catch {
    return false
  }

  return true
}
