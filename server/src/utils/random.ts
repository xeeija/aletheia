import { randomBytes, randomInt } from "crypto"

/**
 * Generates a secure random number between `min` and `max` (exclusive)
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

// https://math.stackexchange.com/questions/2580933/simplest-way-to-produce-an-even-distribution-of-random-values
export const randomScaled = (min: number, max: number) => {
  let p = 0
  let q = 1
  // upper limit (max) of the available RNG
  const k = 256

  while (true) {
    if (q >= max) {
      if (p < q - (q % max)) {
        const v = p % max
        p = Math.floor(p / max)
        q = Math.floor(q / max)

        return v + min
      } else {
        p = p % max
        q = q % max
      }
    }

    const r = Math.floor(Math.random() * k)
    p = p * k + r
    q = q * k
  }
}

const randomFunctions = [random, randomInt, randomScaled]

const currentRandomFn = parseInt(process.env.SPIN_RANDOM_FN ?? "") || 0

export const randomForSpin = (min: number, max: number) => {
  const selectedRandomFn = currentRandomFn !== -1 ? currentRandomFn : Math.floor(Math.random() * randomFunctions.length)
  const randomFnIndex = Math.max(0, Math.min(selectedRandomFn, randomFunctions.length - 1))

  return Math.floor(randomFunctions[randomFnIndex](min, max))
}
