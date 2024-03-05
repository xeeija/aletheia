import { LoadingButton } from "@/components"
import { WheelFormFields } from "@/components/randomWheel"
import { useRandomWheel } from "@/hooks"
import { Portal } from "@mui/material"
import { Form, Formik, FormikProps } from "formik"
import { FC, RefObject } from "react"

type Values = {
  name: string
  accessType: string
  spinDuration: number
  fadeDuration: number
  editAnonymous: boolean
  theme: string
}

interface Props {
  slug: string
  dialogActionsRef?: RefObject<Element>
  formRef?: RefObject<FormikProps<Values>>
}

export const EditWheelForm: FC<Props> = ({ slug, formRef, dialogActionsRef }) => {
  const [{ wheel }, { updateWheel }] = useRandomWheel(slug, {
    details: true,
  })

  if (!wheel) {
    return null
  }

  const initialValues: Values = {
    name: wheel.name ?? "",
    accessType: wheel.accessType,
    spinDuration: wheel.spinDuration,
    fadeDuration: wheel.fadeDuration,
    editAnonymous: wheel.editAnonymous,
    theme: wheel.theme?.id ?? "",
  }

  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={initialValues}
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
