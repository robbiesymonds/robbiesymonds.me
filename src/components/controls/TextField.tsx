import React from "react"

interface TextFieldProps {
  name: string
  type?: "text" | "password" | "email"
  placeholder?: string
  disabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const TextField = ({
  name,
  type = "text",
  placeholder,
  onChange,
}: TextFieldProps) => {
  return (
    <input
      name={name}
      id={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export default React.memo(TextField)
