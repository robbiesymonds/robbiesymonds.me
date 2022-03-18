import useBlob from "@utils/useBlob"
import React from "react"

const Blob = () => {
  const path = React.useRef<SVGPathElement>(null)
  useBlob(path)

  return (
    <>
      <style jsx>{`
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
