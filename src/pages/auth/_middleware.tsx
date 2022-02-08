import { verify } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.AUTH_TOKEN
  if (token && verify(token, process.env.ACCESS_TOKEN_SECRET)) {
    return NextResponse.redirect("/dashboard")
  }

  return NextResponse.next()
}
