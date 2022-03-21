import { DataResponse, RESPONSES } from "@interfaces/api"
import { Invoice } from "@interfaces/invoice"
import useProtocol from "@utils/useProtocol"
import useQuery from "@utils/useQuery"
import { NextApiRequest, NextApiResponse } from "next"

async function getInvoices(req: NextApiRequest, res: NextApiResponse<DataResponse<Invoice[]>>) {
  try {
    const data = await useQuery<Invoice[]>(
      "SELECT * FROM `invoices` WHERE 1 ORDER BY invoice_num DESC"
    )
    return res.status(200).json({ success: true, data })
  } catch (e) {
    console.log("Error: ", e)
    return res.status(200).json({ success: false, error: RESPONSES.SOMETHING_WENT_WRONG })
  }
}

export default useProtocol({ POST: getInvoices })
