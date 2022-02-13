import React from "react"
import { spline } from "@utils/spline"
import SimplexNoise from "simplex-noise"

const simplex = new SimplexNoise()

function normalise(n: number, a: number, b: number, c: number, d: number) {
  return ((n - a) / (b - a)) * (d - c) + c
}

function noise(x: number, y: number) {
  return simplex.noise2D(x, y)
}

function createPoints() {
  const points = []
  const numPoints = 7
  const angleStep = (Math.PI * 2) / numPoints
  const rad = 75

  for (let i = 1; i <= numPoints; i++) {
    const theta = i * angleStep
    const x = 100 + Math.cos(theta) * rad
    const y = 100 + Math.sin(theta) * rad
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

const Blob = () => {
  const path = React.useRef<SVGPathElement>(null)
  const points = createPoints()

  React.useEffect(() => {
    let hueNoiseOffset = 0
    let noiseStep = 0.003

    function animate() {
      path.current.setAttribute("d", spline(points, 1, true, null))

      for (const point of points) {
        // Return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time".
        const nX = noise(point.noiseOffsetX, point.noiseOffsetX)
        const nY = noise(point.noiseOffsetY, point.noiseOffsetY)
        const x = normalise(nX, -1, 1, point.originX - 10, point.originX + 10)
        const y = normalise(nY, -1, 1, point.originY - 10, point.originY + 10)

        // Update the point's coordinates and progress "time" value.
        point.x = x
        point.y = y
        point.noiseOffsetX += noiseStep
        point.noiseOffsetY += noiseStep
      }

      const hueNoise = noise(hueNoiseOffset, hueNoiseOffset)
      const hue = normalise(hueNoise, -1, 1, 0, 360)
      document.documentElement.style.setProperty(
        "--startColor",
        `hsl(${hue}, 100%, 75%)`
      )
      document.documentElement.style.setProperty(
        "--stopColor",
        `hsl(${hue + 60}, 100%, 75%)`
      )
      document.body.style.background = `hsl(${hue + 60}, 75%, 5%)`
      hueNoiseOffset += noiseStep / 6
      requestAnimationFrame(animate)
    }
    animate()
  }, [points])

  return (
    <>
      <style jsx>{`
        :root {
          --startColor: hsl(0, 100%, 75%);
          --stopColor: hsl(0, 100%, 75%);
        }

        svg {
          width: 75%;
          max-width: 40rem;
          margin: auto;
          height: 90vmin;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      `}</style>
      <svg viewBox="0 0 200 200">
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="var(--startColor)" />
            <stop offset="100%" stopColor="var(--stopColor)" />
          </linearGradient>
        </defs>
        <path ref={path} fill="url('#gradient')" />
      </svg>
    </>
  )
}

export default React.memo(Blob)
