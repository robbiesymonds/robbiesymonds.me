function useCurrency(value: number): string {
  const intl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })
  return intl.format(value)
}

export default useCurrency
