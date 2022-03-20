import { Response } from "@interfaces/api"
import { Invoice } from "@interfaces/invoice"
import useProtocol from "@utils/useProtocol"
import useQuery from "@utils/useQuery"
import { NextApiRequest, NextApiResponse } from "next"

async function deleteInvoice(req: NextApiRequest, res: NextApiResponse<Response>) {
  const body: Invoice = req.body

  if (body.id != null) {
    console.log(body)

    try {
      await useQuery("DELETE FROM `invoices` WHERE id = ?", [body.id])
    } catch (e) {
      console.log("Error: ", e)
    }
  }

  console.log("Done")

  return res.status(200).json({ success: true })
}

export default useProtocol({ POST: deleteInvoice })
