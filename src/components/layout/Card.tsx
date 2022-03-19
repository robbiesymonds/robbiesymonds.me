import useDimension from "@utils/useDimension"
import { memo } from "react"

interface CardProps {
  children: React.ReactNode
  padding?: number | string
  margin?: number | string
  width?: number | string
  height?: number | string
  maxWidth?: number | string
}

const Card = ({ padding, margin, width, height, maxWidth, children }: CardProps) => {
  return (
    <div>
      <style jsx>{`
        div {
          width: ${useDimension(width, "100%")};
          height: ${useDimension(height)};
          max-width: ${useDimension(maxWidth)};
          padding: ${useDimension(padding, "1rem")};
          margin: ${useDimension(margin, "0")};
          border: 1px solid var(--theme-colors-border);
          border-radius: 0.85rem;
          box-sizing: border-box;
          background-color: var(--theme-colors-background);
        }
      `}</style>
      {children}
    </div>
  )
}

export default memo(Card)
