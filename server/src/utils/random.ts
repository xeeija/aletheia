import { randomBytes, randomInt } from "crypto"

/**
 * Generates a secure random number between 0 and `max` (exclusive)
 * @param min inclusive minimum
 * @param max exclusive maximum
 */
export const randomNumber = async (min: number, max: number) => {
  return new Promise<number>((resolve, reject) => {
    randomInt(min, max, (err, value) => {
      if (err) {
        reject(err)
      }

      resolve(value)
    })
  })
}

export const random = (min: number, max: number) => Math.random() * (max - min) + min

export const randomHex = (bytes: number) => {
  return randomBytes(bytes).toString("hex")
}

export const randomBase64Url = (bytes: number) => {
  return randomBytes(bytes).toString("base64url")
}
