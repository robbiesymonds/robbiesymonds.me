function useDimension(value: string | number, fallback?: string | number) {
  return value != null
    ? typeof value === "string"
      ? value
      : `${value}rem`
    : fallback
    ? typeof fallback === "string"
      ? fallback
      : `${fallback}rem`
    : "auto"
}

export default useDimension
