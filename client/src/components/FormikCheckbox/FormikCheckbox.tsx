import {
  Checkbox,
  FormHelperText,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Flex,
} from '@chakra-ui/react'
import { Field } from 'formik'

export function FormikCheckbox({
  name,
  label,
  type,
  isRequired,
  note,
}: {
  label: string
  name: string
  type: string
  isRequired?: boolean
  note?: string
}) {
  return (
    <Field name={name}>
      {({ field, form }: { field: any; form: any }) => (
        <FormControl
          isInvalid={form.errors.acceptTerms && form.touched.acceptTerms}
          isRequired={isRequired}
        >
          <Flex>
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
              <span
                dangerouslySetInnerHTML={{
                  __html: label,
                }}
              ></span>
            </FormLabel>
          </Flex>
          {note && (
            <FormHelperText ml="1.8rem" mt="-0.2rem" mb="0.6rem">
              {note}
            </FormHelperText>
          )}
          <FormErrorMessage>{form.errors.acceptTerms}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}
