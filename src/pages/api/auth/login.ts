import { Response, RESPONSES } from "@interfaces/api"
import { NextApiRequest, NextApiResponse } from "next"
import { serialize } from "cookie"
import { sign } from "jsonwebtoken"
import useProtocol from "@utils/useProtocol"

function login(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { password } = req.body

  if (password) {
    if (password == process.env.SECRET_PASSWORD) {
      const token = sign({ admin: true }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30 days",
      })
      res.setHeader(
        "Set-Cookie",
        serialize("AUTH_TOKEN", token, {
          path: "/",
          sameSite: true,
          maxAge: 31556952,
          secure: process.env.NODE_ENV == "production",
        })
      )
      return res.status(200).json({ success: true })
    } else return res.status(401).json({ success: false, error: RESPONSES.WRONG_PASS })
  }

  return res.status(401).json({ success: false, error: RESPONSES.SOMETHING_WENT_WRONG })
}

export default useProtocol({ POST: login })
