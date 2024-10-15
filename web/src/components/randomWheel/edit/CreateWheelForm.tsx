"use client"

import { LoadingButton } from "@/components"
import { WheelFormFields } from "@/components/randomWheel"
import { useColorThemesQuery, useCreateRandomWheelMutation } from "@/generated/graphql"
import { useAuth } from "@/hooks"
import { Portal } from "@mui/material"
import { Form, Formik, FormikProps } from "formik"
import { useRouter } from "next/navigation"
import { FC, RefObject } from "react"

export type WheelValues = {
  name: string
  accessType: string
  spinDuration: number
  fadeDuration: number
  editAnonymous: boolean
  uniqueEntries: boolean
  theme: string
}

const wheelDraft: WheelValues = {
  name: "",
  accessType: "PUBLIC",
  spinDuration: 8000,
  fadeDuration: 8000,
  editAnonymous: true,
  uniqueEntries: false,
  theme: "",
}

interface Props {
  dialogActionsRef?: RefObject<Element>
  formRef?: RefObject<FormikProps<WheelValues>>
}

export const CreateWheelForm: FC<Props> = ({ formRef, dialogActionsRef }) => {
  const router = useRouter()

  const [, createRandomWheel] = useCreateRandomWheelMutation()

  const { authenticated } = useAuth()
  const [{ data }] = useColorThemesQuery()

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
          <WheelFormFields authenticated={authenticated} colorThemes={data?.colorThemes} />

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
