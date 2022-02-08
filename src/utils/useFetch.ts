import { DataResponse } from "@interfaces/api"
import React from "react"

async function useFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = React.useState<T>(null)
  const [error, setError] = React.useState<string>(null)
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    setLoading(true)
    fetch(`/api/${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      ...options,
    })
      .then((res) => res.json())
      .then((res: DataResponse<T>) => {
        if (res.success) setData(res.data)
        else setError(res.error)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [url, options])

  return { data, error, loading }
}

export default useFetch
