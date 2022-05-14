import { RequestHandler } from "express"

// decimal/hex aligned ordering
const DIGITS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"

// lexicographic ordering
// const DIGITS = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz"

// generates a slug in base 64, about 2/3 length of the input hex string
// not to be confused with base64 encoding
export const slugify = (hex: string, slugLength?: number) => {
  hex = hex.replace("-", "")
  const hexInput = slugLength ? hex.substring(0, slugLength * 1.5) : hex

  return hex.length <= 12 ? toString64b(hexInput) : toString64n(hexInput)
}

// hex to base 64 number using divide (and conquer hihi)
// already pretty fast
// only works for numbers <= MAX_SAFE_INTEGER (2^53-1)
export function toString64(hex: string) {
  const radix = DIGITS.length
  let result = ""
  let hexNumber = parseInt(hex, 16)

  while (hexNumber > 0) {
    result = DIGITS[hexNumber % radix] + result
    hexNumber = Math.floor(hexNumber / radix)
  }

  return result
}

// hex to base 64 number using bit operations
// even faster than division, but also for numbers <= MAX_SAFE_INTEGER
// basically takes the left 6 bits (needed bits for 64 chars),
// and looks up that value in the digits, then shifts right and repeat
export const toString64b = (hex: string) => {
  let number = parseInt(hex, 16)

  let lo = number >>> 0
  let hi = (number / 4294967296) >>> 0

  let right = ''
  while (hi > 0) {
    right = DIGITS[0x3f & lo] + right
    lo >>>= 6
    // what happens next line?
    lo |= (0x3f & hi) << 26
    hi >>>= 6
  }

  let left = ''
  do {
    left = DIGITS[0x3f & lo] + left
    lo >>>= 6
  } while (lo > 0)

  return left + right
}

// uses BigInt to work with larger numbers than MAX_SAFE_INTEGER,
// but is slower (~ 10x slower)
export function toString64n(hex: string) {
  const radix = BigInt(DIGITS.length)
  let result = ""
  let hexNumber = BigInt(`0x${hex}`)

  while (hexNumber > 0) {
    result = DIGITS[Number(hexNumber % radix)] + result
    hexNumber = hexNumber / radix
  }

  return result
}


export const slugTest: RequestHandler<{ slug: string; }> = (req, res) => {

  // const n = 1000000
  // const nSlugs = Array<string>(n)
  // const slugDec = BigInt(`0x${req.params.slug}`)

  // for (let i = 0; i < n; i++) {
  //   nSlugs[i] = (BigInt(i) + slugDec).toString(16)
  // }

  res.json({
    input: req.params.slug,
    length: req.query.l,
    number: BigInt(`0x${req.params.slug}`).toString(),
    slug36: BigInt(`0x${req.params.slug}`).toString(36),
    slug64: slugify(req.params.slug, parseInt(req.query.l?.toString() ?? "0")),
  })
}
