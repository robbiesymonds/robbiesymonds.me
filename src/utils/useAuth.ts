import { parse } from "cookie"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const useAuth = () => {
  const router = useRouter()
  const [isAuth, setAuthState] = useState<boolean>(false)

  useEffect(() => {
    setAuthState(parse(document.cookie).AUTH_TOKEN ? true : false)
  }, [router.asPath])

  return { isAuth }
}

export default useAuth
