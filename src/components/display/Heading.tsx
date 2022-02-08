import React from "react"

interface HeadingProps {
  children: string
  size: fontSizes
  bold?: boolean
}

type fontSizes = 1 | 2 | 3
const FONT_SIZES: Record<fontSizes, number> = {
  1: 1.5,
  2: 2,
  3: 3.25,
}

const Heading = ({ children, size, bold }: HeadingProps) => {
  return (
    <>
      <style jsx>{`
        h1 {
          font-family: "Product Sans", sans-serif;
          font-weight: ${bold ? 600 : 400};
          font-size: ${FONT_SIZES[size]}rem;
          margin: 0;
          padding: 0;
        }
      `}</style>

      <h1>{children}</h1>
    </>
  )
}

export default React.memo(Heading)
