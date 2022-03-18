import { DataResponse } from "@interfaces/api"
import React, { useCallback } from "react"

function useFetch<T>(url: string, options?: RequestInit & { useCallback?: boolean }) {
  const [data, setData] = React.useState<T>(null)
  const [error, setError] = React.useState<string>(null)
  const [loading, setLoading] = React.useState<boolean>(false)

  const runFetch = useCallback(
    async (options: RequestInit) => {
      setLoading(true)
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        ...options,
      })
      const data = (await res.json()) as DataResponse<T>
      if (data.success) setData(data.data)
      else setError(data.error)
      setLoading(false)
      return data
    },
    [url]
  )

  React.useEffect(() => {
    if (!options.useCallback) runFetch(options)
  }, [runFetch, options])

  return { data, error, loading, callback: runFetch }
}

export default useFetch
