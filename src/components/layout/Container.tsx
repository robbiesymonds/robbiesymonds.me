import useDimension from "@utils/useDimension"
import { memo } from "react"

interface ContainerProps {
  children: React.ReactNode
  maxWidth?: number | string
  align?: "left" | "center" | "right"
}

const Container = ({ children, maxWidth, align = "left" }: ContainerProps) => {
  return (
    <>
      <style jsx>
        {`
          .hero {
            width: 100%;
            display: flex;
            justify-content: ${align};
            align-items: flex-start;
            margin: 0 auto;
          }

          .hero > div {
            max-width: ${useDimension(maxWidth)};
            width: 100%;
          }
        `}
      </style>
      <div className="hero">
        <div>{children}</div>
      </div>
    </>
  )
}

export default memo(Container)
