import { LoginForm } from "@ui/forms"
import { Dashboard } from "@ui/sections"

function Login() {
  return (
    <>
      <LoginForm />
    </>
  )
}

Login.Title = "Login"
Login.Layout = Dashboard
export default Login
