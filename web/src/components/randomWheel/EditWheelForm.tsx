import { FC, RefObject } from "react"
import { Grid, Mark, Portal } from "@mui/material"
import { Formik, Form, FormikProps, FormikValues } from "formik"
import { InputField, LoadingButton, RadioGroupField, SliderField } from "../components"
import { useRandomWheelBySlugQuery, useUpdateRandomWheelMutation } from "../../generated/graphql"

interface Props {
  slug: string
  dialogActionsRef?: RefObject<Element>
  formRef?: RefObject<FormikProps<FormikValues>>
}

export const EditWheelForm: FC<Props> = ({ slug, formRef, dialogActionsRef }) => {

  const [, updateWheel] = useUpdateRandomWheelMutation()
  const [{ data }] = useRandomWheelBySlugQuery({
    variables: { slug: slug }
  })

  const wheel = data?.randomWheelBySlug

  const durationScale = (x: number) => x / 1000
  const durationLabelFormat = (x: number) => `${x}s`
  const durationMarks: Mark[] = [2, 4, 6, 8, 10].map(x => ({ value: x * 1000, label: `${x}s` }))
  // [2, 3, 5, 8]

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
        {({ isSubmitting, values, initialValues }) => (
          <Form id="editRandomWheelForm">

            <Grid container spacing={2}>

              <Grid item xs={12}>
                <InputField name="name" label="Title" fullWidth />
              </Grid>

              <Grid item xs={12}>
                <RadioGroupField name="accessType" label="Access type" row options={[
                  { value: "PRIVATE", label: "Private" },
                  { value: "PUBLIC", label: "Public", color: "success" },
                ]} />
              </Grid>

              <Grid item xs={12}>
                <SliderField name="spinDuration"
                  label="Spin duration"
                  min={2000}
                  max={10000}
                  step={500}
                  scale={durationScale}
                  marks={durationMarks}
                  valueLabelFormat={durationLabelFormat}
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <SliderField name="fadeDuration"
                  label="Fade out duration"
                  min={2000}
                  max={10000}
                  step={500}
                  scale={durationScale}
                  marks={durationMarks}
                  valueLabelFormat={durationLabelFormat}
                  size="small"
                />
              </Grid>

              {/* <Grid item xs={12}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Update in
                </LoadingButton>
              </Grid> */}

              <Portal container={dialogActionsRef?.current}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  disabled={JSON.stringify(values) === JSON.stringify(initialValues)}
                  form="editRandomWheelForm"
                >
                  Update
                </LoadingButton>
              </Portal>

            </Grid>

          </Form>
        )}
      </Formik>

      {/* <LoadingButton type="submit" form="editRandomWheelForm">
        Submit
      </LoadingButton> */}

    </>
  )
}
