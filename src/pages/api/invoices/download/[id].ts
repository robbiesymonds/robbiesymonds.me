import { Response } from "@interfaces/api"
import useProtocol from "@utils/useProtocol"
import { NextApiRequest, NextApiResponse } from "next"

function downloadInvoice(req: NextApiRequest, res: NextApiResponse<Response>) {
  return res.status(200).json({ success: true })
}

export default useProtocol({ POST: downloadInvoice })
