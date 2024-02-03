import { FC, RefObject } from "react"
import { Portal } from "@mui/material"
import { Formik, Form, FormikProps, FormikValues } from "formik"
import { LoadingButton } from "../components"
import { WheelFormFields } from "./WheelFormFields"
import { useRandomWheel } from "../../hooks"

interface Props {
  slug: string
  dialogActionsRef?: RefObject<Element>
  formRef?: RefObject<FormikProps<FormikValues>>
}

export const EditWheelForm: FC<Props> = ({ slug, formRef, dialogActionsRef }) => {
  const [{ wheel }, { updateWheel }] = useRandomWheel(slug, {
    details: true,
  })

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
          editAnonymous: wheel.editAnonymous,
          theme: wheel.theme?.id ?? "",
        }}
        enableReinitialize
        onSubmit={async ({ theme, ...values }) => {
          await updateWheel({
            ...values,
            name: values.name || null,
            theme: theme ? { id: theme } : undefined,
          })
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
