import { Spinner } from "@ui/display"
import { memo } from "react"

interface IconButtonProps {
  children: React.ReactNode
  disabled?: boolean
  loading?: boolean
  outline?: boolean
  onClick?: () => void
}

const IconButton = ({ children, disabled, loading, outline, onClick }: IconButtonProps) => {
  return (
    <>
      <style jsx>
        {`
          button {
            outline: none;
            border: none;
            background-color: ${outline ? "var(--theme-colors-menu)" : "transparent"};
            color: var(--theme-colors-text);
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            box-sizing: border-box;
            font-size: 1rem;
            cursor: pointer;
            position: relative;
            transition: all 0.1s;
            width: 2rem;
            height: 2rem;
          }

          button > :global(svg) {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 75%;
            height: 75%;
            margin: auto;
            opacity: 0.9;
          }

          button:hover {
            opacity: 0.6;
          }

          button:disabled {
            color: var(--theme-colors-menu);
            cursor: default;
            pointer-events: none;
          }
        `}
      </style>
      <button disabled={disabled} onClick={onClick} type="button">
        {loading ? <Spinner /> : children}
      </button>
    </>
  )
}

export default memo(IconButton)
