import { Select, FormLabel, chakra, Box } from '@chakra-ui/react'
import { Field, Form } from 'formik'
import { OptionField } from '../../data/interview/allFields'

export function FormikSelect({
  name,
  type,
  placeHolder,
  options,
  isRequired,
}: {
  name: string
  type: string
  placeHolder: string
  options: Array<OptionField>
  isRequired?: boolean
}): JSX.Element {
  return (
    <Box>
      <FormLabel name={name} color="white">
        {placeHolder}
        {isRequired && <chakra.span color="red.400"> *</chakra.span>}
      </FormLabel>
      <Field htmlFor={name} name={name} as={Select}>
        {options.map(({ name, value }, index) => {
          return (
            <option key={index} value={value}>
              {name}
            </option>
          )
        })}
      </Field>
    </Box>
  )
}
