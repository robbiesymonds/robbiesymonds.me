import { Response } from "@interfaces/api"
import { Button, TextField } from "@ui/controls"
import { Heading } from "@ui/display"
import useFetch from "@utils/useFetch"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import { memo } from "react"

const LoginForm = () => {
  const router = useRouter()

  const { data, loading, error, callback } = useFetch<Response>(`/api/auth/login`, {
    useCallback: true,
  })

  const formikProps = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async (values) => {
      const data = await callback({ body: JSON.stringify(values) })
      if (data.success) router.push("/dashboard")
    },
  })

  return (
    <>
      <style jsx>{`
        form {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          row-gap: 2rem;
          width: 100%;
          height: calc(100vh - 4rem);
        }
      `}</style>
      <form onSubmit={formikProps.handleSubmit}>
        <TextField
          name="password"
          type="password"
          onChange={formikProps.handleChange}
          maxWidth={20}
          error={error}
        />
        <Button
          loading={loading}
          disabled={!(formikProps.dirty && formikProps.isValid)}
          type="submit">
          Unlock
        </Button>
      </form>
    </>
  )
}

export default memo(LoginForm)
