import { Spinner } from "@ui/display"
import { memo } from "react"

interface ButtonProps {
  children: string
  type?: "button" | "submit" | "reset"
  outline?: boolean
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

const Button = ({
  children,
  type = "button",
  outline,
  disabled,
  loading,
  onClick,
}: ButtonProps) => {
  return (
    <>
      <style jsx>{`
        button {
          outline: none;
          border: none;
          background-color: ${outline ? "transparent" : "var(--theme-colors-text)"};
          color: ${outline ? "var(--theme-colors-text)" : "var(--theme-colors-border)"};
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          border: ${outline ? "1px solid var(--theme-colors-text)" : "none"};
          box-sizing: border-box;
          font-family: "Product Sans", sans-serif;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.1s all;
          position: relative;
        }

        button:hover {
          opacity: 0.6;
        }

        button:disabled {
          background-color: var(--theme-colors-menu);
          cursor: default;
          pointer-events: none;
        }

        span {
          opacity: ${loading ? 0 : 1};
          transition: all 0.1s;
        }

        div {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          width: 1.1rem;
          height: 1.1rem;
          margin: auto;
          opacity: ${loading ? 1 : 0};
          transition: all 0.1s;
        }
      `}</style>
      <button type={type} disabled={disabled} onClick={onClick}>
        <span>{children}</span>
        <div>
          <Spinner />
        </div>
      </button>
    </>
  )
}

export default memo(Button)
