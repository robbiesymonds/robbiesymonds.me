import { useEffect, useRef } from "react"

function useClickOutside(onClick: () => void) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current.contains(e.target as Node)) onClick()
    }

    if (ref.current) {
      document.body.addEventListener("click", handleClick)
      return () => document.body.removeEventListener("click", handleClick)
    }
  }, [ref, onClick])

  return { ref }
}

export default useClickOutside
