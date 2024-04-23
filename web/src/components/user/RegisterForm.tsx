import { InputField, LinkText, LoadingButton, PasswordField } from "@/components"
import { useRegisterMutation } from "@/generated/graphql"
import { useAlert, useUsernameValidator } from "@/hooks"
import { passwordStrength } from "@/utils/password"
import { SvgIcon, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { FC, useMemo } from "react"
import { TiArrowRight } from "react-icons/ti"
import { object, ref, string } from "yup"

interface Props {}

export const RegisterForm: FC<Props> = () => {
  const [, register] = useRegisterMutation()
  const router = useRouter()

  const { showSuccess, showError } = useAlert()

  // TODO: One useValidator hook with all (or almost/most common) validators?
  const [validateUsername] = useUsernameValidator()
  const passwordStrengthFn = useMemo(() => passwordStrength, [])

  const passwordHelperText = "Min. length 8, must contain a-z, A-Z, 0-9 and special letters"

  const validationSchema = object().shape({
    username: string().required("Required"),
    // .min(4, "Must have at least 4 characters")
    // .max(32, "Can only have 32 characters"),
    // .test({
    //   test: async (value) => (await validateUsername(value)) === undefined,
    //   // message: "$resolved",
    // }),
    displayname: string(),
    password: string()
      .required("Required")
      .test({
        test: (value) => passwordStrengthFn(value) > 40,
        message: passwordHelperText,
      }),
    confirmPassword: string()
      .required("Required")
      .oneOf([ref("password").resolve()], "Must match password"),
  })

  return (
    <Formik
      initialValues={{
        username: "",
        displayname: "",
        password: "",
        confirmPassword: "",
      }}
      validateOnChange={false}
      // validateOnBlur={false}
      validationSchema={validationSchema}
      onSubmit={async (values, { setFieldError, setFieldTouched }) => {
        const response = await register({
          ...values,
          displayname: values.displayname || null, // pass null if empty
        })

        // Unexpected error
        if (response.error) {
          if (response.error.networkError) {
            showError("Could not connect to login server.")
          } else if (response.error.graphQLErrors) {
            showError(response.error.graphQLErrors.join("\\n"))
          } else {
            showError("Unknown error, please try again later.")
          }

          // Reset password
          values.password = ""
          values.confirmPassword = ""

          return
        }

        // Handle errors
        if (response.data?.register.errors) {
          response.data.register.errors.forEach(({ field, message }) => {
            setFieldError(field, message)
          })

          // Reset password
          values.password = ""
          values.confirmPassword = ""
          setFieldTouched("password", false)
          setFieldTouched("confirmPassword", false)

          return
        }

        showSuccess("Registered successfully")

        // TODO: Redirect to "welcome page"?
        // Redirect to home page
        await router.push("/")
      }}
    >
      {({ isSubmitting, values, isValid, submitCount }) => (
        <Form>
          <InputField
            name="username"
            label="Username"
            margin="normal"
            fullWidth
            required
            icon
            maxLength={32}
            showMaxLength={24}
            validate={validateUsername}
          />

          <InputField name="displayname" label="Display name" margin="normal" fullWidth />

          {/* width: calc(100% - 36px) */}
          {/* Password Strength Meter: transition width input::after, border-width: 6-8px, border-bottom-right-radius 0 if 100% width */}
          <PasswordField
            name="password"
            label="Password"
            margin="normal"
            fullWidth
            required
            icon
            // TODO: passworStrength is called in every render, maybe useMemo?
            strength={passwordStrengthFn(values.password)}
            helperText={passwordHelperText}
          />

          <InputField
            name="confirmPassword"
            label="Confirm password"
            type="password"
            margin="normal"
            fullWidth
            required
            icon
          />

          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            loading={isSubmitting}
            disabled={submitCount > 0 && !isValid}
            position="end"
            endIcon={<SvgIcon component={TiArrowRight} />}
            sx={{ mt: 2 }}
          >
            Register
          </LoadingButton>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {"Already have an account? "}
            <LinkText href="/login">Login</LinkText>
          </Typography>
        </Form>
      )}
    </Formik>
  )
}
