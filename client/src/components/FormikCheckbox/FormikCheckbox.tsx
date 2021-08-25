import {
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react'
import { Field } from 'formik'

export function FormikCheckbox({
  name,
  label,
  type,
}: {
  label: string
  name: string
  type: string
}) {
  return (
    <Field name={name}>
      {({ field, form }: { field: any; form: any }) => (
        <FormControl
          d="flex"
          isInvalid={form.errors.acceptTerms && form.touched.acceptTerms}
        >
          <Checkbox
            d="flex"
            alignItems="flex-start"
            {...field}
            type={type}
            mr={3}
            mt={1}
            id={name}
          />
          <FormLabel htmlFor={name} color="black.100">
            {label}
          </FormLabel>
          <FormErrorMessage>{form.errors.acceptTerms}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}
