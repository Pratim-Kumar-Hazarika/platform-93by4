import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  theme,
} from '@chakra-ui/react'
import { Field } from 'formik'

export function FormikTextarea({
  name,
  label,
  type,
  placeHolder,
  isRequired,
}: {
  name: string
  label?: string
  type: string
  placeHolder: string
  isRequired?: boolean
}) {
  return (
    <Field name={name}>
      {({ field, form }: { field: any; form: any }) => (
        <FormControl
          isInvalid={form.errors[name] && form.touched[name]}
          isRequired={isRequired}
        >
          {label && (
            <FormLabel htmlFor={name} color="black.50">
              {label}
            </FormLabel>
          )}
          <Textarea
            mt="0.3rem"
            mb="1rem"
            {...field}
            id={name}
            rows={4}
            placeholder={placeHolder}
          />

          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}
