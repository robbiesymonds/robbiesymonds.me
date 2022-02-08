import { Response } from "@interfaces/api"
import { serialize } from "cookie"
import { NextApiRequest, NextApiResponse } from "next"

function logout(req: NextApiRequest, res: NextApiResponse<Response>) {
  res.setHeader(
    "Set-Cookie",
    serialize("AUTH_TOKEN", null, {
      path: "/",
      sameSite: true,
      httpOnly: true,
      maxAge: -1,
      secure: process.env.NODE_ENV == "production",
    })
  )
  return res.status(200).redirect("/")
}

export default logout
