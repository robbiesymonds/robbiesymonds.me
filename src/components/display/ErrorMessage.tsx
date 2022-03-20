import { memo } from "react"
import { ErrorIcon } from "./icons"

interface ErrorMessageProps {
  children?: string
  show?: boolean
  major?: boolean
}

const ErrorMessage = ({ children, show = true, major }: ErrorMessageProps) => {
  if (!show || !children) return null
  return (
    <div className={major ? "major" : ""}>
      <style jsx>{`
        div {
          width: 100%;
          font-family: "Product Sans", sans-serif;
          color: #ef5350;
          font-weight: 500;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          padding: 0.25rem 0;
          margin-top: 0.5rem;
        }

        div > :global(svg) {
          width: 1rem;
          height: 1rem;
          margin-right: 0.25rem;
        }

        .major {
          justify-content: center;
          font-size: 1.15rem;
          font-weight: 700;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          pointer-events: none;
        }

        .major > :global(svg) {
          width: 1.5rem;
          height: 1.5rem;
          margin-right: 0.5rem;
        }
      `}</style>
      <ErrorIcon />
      {children}
    </div>
  )
}

export default memo(ErrorMessage)
