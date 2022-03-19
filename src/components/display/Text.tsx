import { memo } from "react"

type FontWeights = "300" | "400" | "500" | "600" | "700"
type TextAlign = "left" | "right" | "center" | "justify"
type FontSizes = "xs" | "sm" | "md" | "lg" | "xl"

const fontSizes: Record<FontSizes, number> = {
  xs: 0.8,
  sm: 1,
  md: 1.25,
  lg: 2.5,
  xl: 5.5,
}

interface TextProps {
  children: string | React.ReactNode
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  size?: FontSizes
  weight?: FontWeights
  align?: TextAlign
  style?: React.CSSProperties
}

const Text = ({ children, as, size, weight, align, style }: TextProps) => {
  const Tag = as ?? "div"

  return (
    <Tag style={style}>
      <style jsx>{`
        ${Tag} {
          font-family: "Roboto", sans-serif;
          font-weight: ${weight ?? "400"};
          color: var(--theme-colors-text);
          text-align: ${align ?? "left"};
          font-size: ${fontSizes[size ?? "sm"]}rem;
          width: fit-content;
        }
      `}</style>
      {children}
    </Tag>
  )
}

export default memo(Text)
