import { verify } from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"

enum HTTPMethod {
  CONNECT = "CONNECT",
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
  TRACE = "TRACE",
}

type ApiHandler = Partial<
  Record<HTTPMethod, (req: NextApiRequest, res: NextApiResponse) => unknown | Promise<unknown>>
>

function useProtocol(handler: ApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (!handler[req.method]) {
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
    } else {
      try {
        const token = req.cookies.AUTH_TOKEN
        if (token && verify(token, process.env.ACCESS_TOKEN_SECRET)) {
          await handler[req.method](req, res)
        } else {
          return res.status(401).json({ error: `Unauthorized` })
        }
      } catch (e) {
        return res.status(500).json({ error: e })
      }
    }
  }
}

export default useProtocol
