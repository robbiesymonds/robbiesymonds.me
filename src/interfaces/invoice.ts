export interface InvoiceTask {
  _id: string
  title: string
  description: string
  rate: number
  hours: number
}

export interface Invoice {
  id: string
  invoice_num: number
  recipient: string
  recipient_info: string
  entries: Array<InvoiceTask>
  date: Date
}
