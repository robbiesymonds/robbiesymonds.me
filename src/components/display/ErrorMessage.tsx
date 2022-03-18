import { memo } from "react"
import ErrorIcon from "./icons/ErrorIcon"

interface ErrorMessageProps {
  children?: string
  show?: boolean
}

const ErrorMessage = ({ children, show = true }: ErrorMessageProps) => {
  if (!show || !children) return null
  return (
    <div>
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
      `}</style>
      <ErrorIcon />
      {children}
    </div>
  )
}

export default memo(ErrorMessage)
