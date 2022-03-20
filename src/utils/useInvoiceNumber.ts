function useInvoiceNumber(num: number) {
  return `#${String(num).padStart(3, "0")}`
}

export default useInvoiceNumber
