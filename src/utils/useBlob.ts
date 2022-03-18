import { createRef, MutableRefObject, useEffect, useRef } from "react"
import SimplexNoise from "simplex-noise"

type Coords = Array<number>

type Point = {
  x: number
  y: number
  originX: number
  originY: number
  noiseOffsetX: number
  noiseOffsetY: number
}

function formatPoints(points: Array<Point>): Coords {
  const coords: Coords[] = points.map(({ x, y }) => [x, y])
  const point = (n: number) => (n < 0 ? coords[coords.length + n] : coords[n])
  const shifts = [point(-1), point(-2), point(0), point(1)]

  // Ensures that the point path is passed as a closed loop.
  coords.unshift(shifts[0])
  coords.unshift(shifts[1])
  coords.push(shifts[2])
  coords.push(shifts[3])

  return coords.flat()
}

function spline(points: Array<Point>, tension: number = 1) {
  const coords = formatPoints(points)
  let path = "M" + [coords[2], coords[3]]

  for (let i = 2; i < coords.length - 4; i += 2) {
    const x0 = i ? coords[i - 2] : coords[0]
    const y0 = i ? coords[i - 1] : coords[1]
    const x1 = coords[i + 0]
    const y1 = coords[i + 1]
    const x2 = coords[i + 2]
    const y2 = coords[i + 3]
    const x3 = i !== coords.length - 4 ? coords[i + 4] : x2
    const y3 = i !== coords.length - 4 ? coords[i + 5] : y2

    const cp1x = x1 + ((x2 - x0) / 6) * tension
    const cp1y = y1 + ((y2 - y0) / 6) * tension
    const cp2x = x2 - ((x3 - x1) / 6) * tension
    const cp2y = y2 - ((y3 - y1) / 6) * tension

    path += "C" + [cp1x, cp1y, cp2x, cp2y, x2, y2]
  }

  return path
}

function normalise(n: number, a: number, b: number, c: number, d: number) {
  return ((n - a) / (b - a)) * (d - c) + c
}

function createPoints(n: number = 7): Array<Point> {
  const points: Point[] = []
  for (let i = 1; i <= n; i++) {
    const theta = (i * (Math.PI * 2)) / n
    const x = 100 + Math.cos(theta) * 75
    const y = 100 + Math.sin(theta) * 75
    points.push({
      x: x,
      y: y,
      originX: x,
      originY: y,
      noiseOffsetX: Math.random() * 1000,
      noiseOffsetY: Math.random() * 1000,
    })
  }
  return points
}

const useBlob = (path: MutableRefObject<SVGPathElement>) => {
  const noiseStep = 0.003
  const hueNoiseOffset = useRef<number>(null)
  const simplex = new SimplexNoise()
  const points = createPoints()

  useEffect(() => {
    function animate() {
      path.current.setAttribute("d", spline(points))

      for (const point of points) {
        // Return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time".
        const nX = simplex.noise2D(point.noiseOffsetX, point.noiseOffsetX)
        const nY = simplex.noise2D(point.noiseOffsetY, point.noiseOffsetY)
        const x = normalise(nX, -1, 1, point.originX - 10, point.originX + 10)
        const y = normalise(nY, -1, 1, point.originY - 10, point.originY + 10)

        // Update the point's coordinates and progress "time" value.
        point.x = x
        point.y = y
        point.noiseOffsetX += noiseStep
        point.noiseOffsetY += noiseStep
      }

      const hueNoise = simplex.noise2D(hueNoiseOffset.current, hueNoiseOffset.current)
      const hue = normalise(hueNoise, -1, 1, 0, 360)
      const setProperty = (p: string, v: string) => {
        document.documentElement.style.setProperty(p, v)
      }

      setProperty("--startColor", `hsl(${hue}, 100%, 75%)`)
      setProperty("--stopColor", `hsl(${hue + 60}, 100%, 75%)`)
      document.body.style.background = `hsl(${hue + 60}, 75%, 5%)`

      hueNoiseOffset.current += noiseStep / 6
      requestAnimationFrame(animate)
    }
    animate()
  })
}

export default useBlob
