import { useUsernameExistsMutation } from "@/generated/graphql"
import { FieldValidator } from "formik"

const usernamePattern = /^[A-Za-z0-9]\w{3,31}$/

export const useUsernameValidator = () => {
  const [{ fetching }, usernameExists] = useUsernameExistsMutation()

  const validate: FieldValidator = (username: string) => {
    if (username.length < 4) {
      return "Must have at least 4 characters"
    }
    if (username.length > 32) {
      return "Can only have 32 characters"
    }

    if (!usernamePattern.test(username)) {
      return "Username may only contain letters, numbers and underline"
    }

    return usernameExists({ username: username }).then(({ data }) =>
      data?.usernameExists ? "User already exists" : undefined
    )
  }

  return [validate, { fetching }] as const
}
