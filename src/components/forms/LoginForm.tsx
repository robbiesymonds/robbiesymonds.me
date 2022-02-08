import { Response } from "@interfaces/api"
import { TextField } from "@ui/controls"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import React from "react"

const LoginForm = () => {
  const router = useRouter()
  const [error, setError] = React.useState<string>(null)

  const formikProps = useFormik({
    initialValues: {
      password: "",
    },

    onSubmit: async (values) => {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const data: Response = await res.json()
      if (data.success) router.push("/dashboard")
      else setError(data.error)
    },
  })

  return (
    <form onSubmit={formikProps.handleSubmit}>
      <TextField
        name="password"
        type="password"
        onChange={formikProps.handleChange}
      />

      <button
        type="submit"
        disabled={!(formikProps.dirty && formikProps.isValid)}>
        Submit
      </button>
      {error}
    </form>
  )
}

export default React.memo(LoginForm)
