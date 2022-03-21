import { Invoice } from "@interfaces/invoice"
import useCurrency from "./useCurrency"

function useInvoiceTotal(i: Invoice, options?: { disableCommas?: boolean }) {
  let total: number = 0
  i.entries.forEach(({ hours, rate }) => (total += hours * rate))
  let result = useCurrency(total)

  if (options?.disableCommas) result = result.replace(",", "")

  return result
}

export default useInvoiceTotal
