import { Response } from "@interfaces/api"
import { Invoice } from "@interfaces/invoice"
import useProtocol from "@utils/useProtocol"
import useQuery from "@utils/useQuery"
import { NextApiRequest, NextApiResponse } from "next"
import { v4 } from "uuid"

const checkBody = (b: Invoice) =>
  b.invoice_num && b.recipient && b.recipient_info && b.date && b.entries?.length > 0

async function newInvoice(req: NextApiRequest, res: NextApiResponse<Response>) {
  const body: Invoice = req.body

  if (checkBody(body)) {
    console.log(body)

    try {
      await useQuery(
        "INSERT INTO `invoices` (id, invoice_num, recipient, recipient_info, entries, date) VALUES (?, ?, ?, ?, ?, ?)",
        [
          v4(),
          body.invoice_num,
          body.recipient,
          body.recipient_info,
          JSON.stringify(body.entries.filter((e) => e.title && e.description && e.hours && e.rate)),
          body.date,
        ]
      )
    } catch (e) {
      console.log("Error: ", e)
    }
  }

  console.log("Done")

  return res.status(200).json({ success: true })
}

export default useProtocol({ POST: newInvoice })
