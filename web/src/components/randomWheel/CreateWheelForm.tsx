import { FC, RefObject } from "react"
import { Portal } from "@mui/material"
import { Formik, Form, FormikProps, FormikValues } from "formik"
import { LoadingButton } from "../components"
import { useCreateRandomWheelMutation } from "../../generated/graphql"
import { WheelFormFields } from "./WheelFormFields"
import { useRouter } from "next/router"

const wheelDraft = {
  name: "",
  accessType: "PRIVATE",
  spinDuration: 6000,
  fadeDuration: 6000,
}

interface Props {
  dialogActionsRef?: RefObject<Element>
  formRef?: RefObject<FormikProps<FormikValues>>
}

export const CreateWheelForm: FC<Props> = ({ formRef, dialogActionsRef }) => {

  const router = useRouter()

  const [, createRandomWheel] = useCreateRandomWheelMutation()

  return (
    <Formik
      innerRef={formRef}
      initialValues={wheelDraft}
      enableReinitialize
      onSubmit={async (values) => {
        const response = await createRandomWheel(values)

        // TODO: proper error handling/feedback

        if (response.error?.networkError) console.warn(response.error.networkError)
        else if (response.error?.graphQLErrors) console.warn(response.error.graphQLErrors)

        if (response.data?.createRandomWheel) {
          // TODO: Success snackbar
          router.push(`/randomwheel/${response.data.createRandomWheel.slug}`)
        }

      }}
    >
      {({ isSubmitting }) => (
        <Form id="createRandomWheelForm">

          <WheelFormFields />

          <Portal container={dialogActionsRef?.current}>
            <LoadingButton
              type="submit"
              variant="contained"
              color="success"
              loading={isSubmitting}
              form="createRandomWheelForm"
            >
              Create
            </LoadingButton>
          </Portal>

        </Form>
      )}
    </Formik>
  )
}
