import { ThemeColor } from "@/types"

const strengthLevels = [
  {
    value: 100,
    // length 12+, lowercase, uppercase, number, 2 (?) special char, not 3 consecutivee same chars
    regex: /(?=.{12,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=(?:.*[^A-Za-z0-9]){2,})(?!.*(.)\1\1.*).*/,
  },
  {
    value: 80,
    // length 12+, lowercase, uppercase, number, special char, not 3 consecutivee same chars,
    regex: /(?=.{12,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?!.*(.)\1\1).*/,
  },
  {
    value: 60,
    // length 8+, lowercase, uppercase, number, special char
    regex: /(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
  },
  {
    value: 40,
    // length 8+, lowercase, uppercase, number
    regex: /(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
  },
  {
    value: 20,
    // length 6+, lowercase, uppercase
    regex: /(?=.{6,})(?=.*[a-z])(?=.*[A-Z])/,
  },
  {
    value: 10,
    // at least one char
    regex: /.+/,
  },
]

export const passwordStrength = (password: string) => {
  return strengthLevels.find((level) => level.regex.test(password))?.value ?? 0
}

export const passwordStrengthColor: (strength: number) => ThemeColor | undefined = (strength: number) => {
  if (strength >= 66) return "success"
  if (strength >= 33) return "warning"
  if (strength > 0) return "error"

  return undefined
}
