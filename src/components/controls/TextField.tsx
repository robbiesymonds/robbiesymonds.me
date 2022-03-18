import ErrorMessage from "@ui/display/ErrorMessage"
import { memo } from "react"

interface TextFieldProps {
  name: string
  type?: "text" | "password" | "email"
  placeholder?: string
  disabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  maxWidth?: number
  error?: string
}

const TextField = ({
  name,
  type = "text",
  placeholder,
  onChange,
  maxWidth,
  error,
}: TextFieldProps) => {
  return (
    <>
      <style jsx>{`
        input {
          font-family: "Open Sans", sans-serif;
          color: var(--theme-colors-text);
          font-size: 1rem;
          outline: none;
          border: 1px solid var(--theme-colors-border);
          border-radius: 0.25rem;
          background-color: var(--theme-colors-menu);
          padding: 0.5rem;
          width: 100%;
          box-sizing: border-box;
        }

        div {
          width: ${maxWidth ? "95%" : "auto"};
          max-width: ${maxWidth}rem;
        }
      `}</style>
      <div>
        <input name={name} id={name} type={type} placeholder={placeholder} onChange={onChange} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </>
  )
}

export default memo(TextField)
