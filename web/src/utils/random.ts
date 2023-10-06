import { randomBytes } from "crypto"

export const twitchAuthState: string[] = []

export const randomHex = (bytes: number) => {
  return randomBytes(bytes).toString("hex")
}

export const randomBase64Url = (bytes: number) => {
  return randomBytes(bytes).toString("base64url")
}
