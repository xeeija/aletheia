import { LoadingButton } from "@/components"
import { WheelFormFields } from "@/components/randomWheel"
import { useCreateRandomWheelMutation } from "@/generated/graphql"
import { Portal } from "@mui/material"
import { Form, Formik, FormikProps, FormikValues } from "formik"
import { useRouter } from "next/router"
import { FC, RefObject } from "react"

const wheelDraft = {
  name: "",
  accessType: "PUBLIC",
  spinDuration: 8000,
  fadeDuration: 8000,
  editAnonymous: true,
  theme: "",
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
          await router.push(`/randomwheel/${response.data.createRandomWheel.slug}`)
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
