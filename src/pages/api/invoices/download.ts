import { RESPONSES } from "@interfaces/api"
import useProtocol from "@utils/useProtocol"
import { NextApiRequest, NextApiResponse } from "next"

async function getInvoices(req: NextApiRequest, res: NextApiResponse) {
  try {
    return res.status(200).json({ success: true })
  } catch (e) {
    console.log("Error: ", e)
    return res.status(200).json({ success: false, error: RESPONSES.SOMETHING_WENT_WRONG })
  }
}

export default useProtocol({ POST: getInvoices })
