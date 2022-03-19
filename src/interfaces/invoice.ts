export interface InvoiceTask {
  _id: string
  title: string
  description: string
  rate: number
  hours: number
}

export interface Invoice {
  invoice_num: number
  recipient: string
  recipient_info: string
  entires: Array<InvoiceTask>
  date: Date
}
