import { Response } from "@interfaces/api"
import { Invoice } from "@interfaces/invoice"
import useProtocol from "@utils/useProtocol"
import useQuery from "@utils/useQuery"
import { NextApiRequest, NextApiResponse } from "next"

const checkBody = (b: Invoice) =>
  b.id && b.invoice_num && b.recipient && b.recipient_info && b.date && b.entries?.length > 0

async function updateInvoice(req: NextApiRequest, res: NextApiResponse<Response>) {
  const body: Invoice = req.body

  if (checkBody(body)) {
    console.log(body)

    try {
      await useQuery(
        "UPDATE `invoices` SET invoice_num = ?, recipient = ?, recipient_info = ?, entries = ?, date = ? WHERE id = ?",
        [
          body.invoice_num,
          body.recipient,
          body.recipient_info,
          JSON.stringify(body.entries),
          body.date,
          body.id,
        ]
      )
    } catch (e) {
      console.log("Error: ", e)
    }
  }

  console.log("Done")

  return res.status(200).json({ success: true })
}

export default useProtocol({ POST: updateInvoice })
