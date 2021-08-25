import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { Field } from 'formik'
import { theme } from '../../themes'

export function FormikField({
  name,
  label,
  type,
  placeHolder,
}: {
  name: string
  label?: string
  type: string
  placeHolder: string
}): JSX.Element {
  return (
    <Field name={name}>
      {({ field, form }: { field: any; form: any }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          {label && (
            <FormLabel htmlFor={name} color={theme.colors.black['50']}>
              {label}
            </FormLabel>
          )}
          <Input {...field} id={name} placeholder={placeHolder} type={type} />

          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}
