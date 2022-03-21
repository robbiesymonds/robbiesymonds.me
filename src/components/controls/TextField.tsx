import { ErrorMessage } from "@ui/display"
import useDimension from "@utils/useDimension"
import { memo } from "react"

interface TextFieldProps {
  name: string
  type?: "text" | "password" | "email" | "number" | "date"
  placeholder?: string
  disabled?: boolean
  defaultValue?: string | number
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  maxWidth?: string | number
  error?: string
}

const TextField = ({
  name,
  type = "text",
  placeholder,
  disabled,
  defaultValue,
  onChange,
  maxWidth,
  error,
}: TextFieldProps) => {
  return (
    <>
      <style jsx>{`
        input {
          font-family: "Roboto", sans-serif;
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
          width: 100%;
          max-width: ${useDimension(maxWidth)};
        }
      `}</style>
      <div>
        <input
          name={name}
          id={name}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          step="0.01"
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </>
  )
}

export default memo(TextField)
