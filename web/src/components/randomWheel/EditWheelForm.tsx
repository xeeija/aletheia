import { FC, RefObject } from "react"
import { Portal } from "@mui/material"
import { Formik, Form, FormikProps, FormikValues } from "formik"
import { LoadingButton } from "../components"
import { useRandomWheelBySlugQuery, useUpdateRandomWheelMutation } from "../../generated/graphql"
import { WheelFormFields } from "./WheelFormFields"

interface Props {
  slug: string
  dialogActionsRef?: RefObject<Element>
  formRef?: RefObject<FormikProps<FormikValues>>
}

export const EditWheelForm: FC<Props> = ({ slug, formRef, dialogActionsRef }) => {

  const [, updateWheel] = useUpdateRandomWheelMutation()
  const [{ data }] = useRandomWheelBySlugQuery({
    variables: { slug: slug ?? "" }
  })

  const wheel = data?.randomWheelBySlug

  if (!wheel) {
    return null
  }

  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={{
          name: wheel.name ?? "",
          accessType: wheel.accessType,
          spinDuration: wheel.spinDuration,
          fadeDuration: wheel.fadeDuration,
        }}
        enableReinitialize
        onSubmit={async (values) => {

          const { error } = await updateWheel({
            id: wheel.id,
            options: {
              ...values,
              name: values.name || null,
            },
          })
          if (error) {
            console.warn(error)
          }
          // // TODO: proper error handling/feedback

        }}
      >
        {({ isSubmitting, dirty }) => (
          <Form id="editRandomWheelForm">

            <WheelFormFields />

            <Portal container={dialogActionsRef?.current}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                disabled={!dirty}
                form="editRandomWheelForm"
              >
                Update
              </LoadingButton>
            </Portal>

          </Form>
        )}
      </Formik>

    </>
  )
}
