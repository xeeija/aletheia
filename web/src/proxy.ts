import { NextResponse, type NextProxy } from "next/server"

export const proxy: NextProxy = () => {
  // console.log("proxy", request.url)
  return NextResponse.next()
}

export default proxy
