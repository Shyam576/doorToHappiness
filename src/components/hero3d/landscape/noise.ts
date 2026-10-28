const fract = (x: number): number => x - Math.floor(x)

function hash(x: number, y: number, z: number): number {
  return fract(Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453123)
}

function noise3(x: number, y: number, z: number): number {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const iz = Math.floor(z)
  const fx = x - ix
  const fy = y - iy
  const fz = z - iz
  const u = fx * fx * (3 - 2 * fx)
  const v = fy * fy * (3 - 2 * fy)
  const w = fz * fz * (3 - 2 * fz)
  const a = hash(ix, iy, iz)
  const b = hash(ix + 1, iy, iz)
  const c = hash(ix, iy + 1, iz)
  const d = hash(ix + 1, iy + 1, iz)
  const e = hash(ix, iy, iz + 1)
  const f = hash(ix + 1, iy, iz + 1)
  const g = hash(ix, iy + 1, iz + 1)
  const h = hash(ix + 1, iy + 1, iz + 1)
  const mix = (p: number, q: number, t: number) => p + (q - p) * t
  return mix(mix(mix(a, b, u), mix(c, d, u), v), mix(mix(e, f, u), mix(g, h, u), v), w) * 2 - 1
}

/** Layered (fractal Brownian motion) value noise, used to displace terrain and color it by elevation. */
export function fbm(x: number, y: number, z: number): number {
  let n = 0
  let amplitude = 0.55
  let frequency = 1
  for (let i = 0; i < 4; i++) {
    n += noise3(x * frequency, y * frequency, z * frequency) * amplitude
    frequency *= 2.03
    amplitude *= 0.48
  }
  return n
}

export { hash }
