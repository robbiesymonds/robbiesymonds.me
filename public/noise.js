/*
 * A fast javascript implementation of simplex noise by Jonas Wagner
 */

const F2 = 0.5 * (Math.sqrt(3.0) - 1.0)
const G2 = (3.0 - Math.sqrt(3.0)) / 6.0
const F3 = 1.0 / 3.0
const G3 = 1.0 / 6.0
const F4 = (Math.sqrt(5.0) - 1.0) / 4.0
const G4 = (5.0 - Math.sqrt(5.0)) / 20.0

const grad2 = new Float64Array([
  1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 1, 0, -1, 0, 0, 1, 0, -1, 0, 1, 0,
  -1,
])

const fastFloor = (x) => Math.floor(x) | 0
const perm = buildPermutationTable(Math.random)
const permGrad2x = new Float64Array(perm).map((v) => grad2[(v % 12) * 2])
const permGrad2y = new Float64Array(perm).map((v) => grad2[(v % 12) * 2 + 1])

export function noise2D(x, y) {
  let n0 = 0
  let n1 = 0
  let n2 = 0

  const s = (x + y) * F2
  const i = fastFloor(x + s)
  const j = fastFloor(y + s)
  const t = (i + j) * G2
  const X0 = i - t
  const Y0 = j - t
  const x0 = x - X0
  const y0 = y - Y0

  let i1, j1
  if (x0 > y0) {
    i1 = 1
    j1 = 0
  } else {
    i1 = 0
    j1 = 1
  }

  const x1 = x0 - i1 + G2
  const y1 = y0 - j1 + G2
  const x2 = x0 - 1.0 + 2.0 * G2
  const y2 = y0 - 1.0 + 2.0 * G2

  const ii = i & 255
  const jj = j & 255

  let t0 = 0.5 - x0 * x0 - y0 * y0
  if (t0 >= 0) {
    const gi0 = ii + perm[jj]
    const g0x = permGrad2x[gi0]
    const g0y = permGrad2y[gi0]
    t0 *= t0

    n0 = t0 * t0 * (g0x * x0 + g0y * y0)
  }
  let t1 = 0.5 - x1 * x1 - y1 * y1
  if (t1 >= 0) {
    const gi1 = ii + i1 + perm[jj + j1]
    const g1x = permGrad2x[gi1]
    const g1y = permGrad2y[gi1]
    t1 *= t1

    n1 = t1 * t1 * (g1x * x1 + g1y * y1)
  }
  let t2 = 0.5 - x2 * x2 - y2 * y2
  if (t2 >= 0) {
    const gi2 = ii + 1 + perm[jj + 1]
    const g2x = permGrad2x[gi2]
    const g2y = permGrad2y[gi2]
    t2 *= t2

    n2 = t2 * t2 * (g2x * x2 + g2y * y2)
  }

  return 70.0 * (n0 + n1 + n2)
}

export function buildPermutationTable(random) {
  const tableSize = 512
  const p = new Uint8Array(tableSize)
  for (let i = 0; i < tableSize / 2; i++) {
    p[i] = i
  }
  for (let i = 0; i < tableSize / 2 - 1; i++) {
    const r = i + ~~(random() * (256 - i))
    const aux = p[i]
    p[i] = p[r]
    p[r] = aux
  }
  for (let i = 256; i < tableSize; i++) {
    p[i] = p[i - 256]
  }
  return p
}
