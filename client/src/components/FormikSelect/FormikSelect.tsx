import { Select } from '@chakra-ui/react'
import { Field } from 'formik'
import { OptionField } from '../../data/staticData/allFields'

export function FormikSelect({
  name,
  label,
  type,
  placeHolder,
  options,
}: {
  name: string
  label?: string
  type: string
  placeHolder: string
  options: Array<OptionField>
}): JSX.Element {
  return (
    <Field name={name} as={Select}>
      {/* <Select placeholder={placeHolder} name={name}> */}
      {options.map(({ name, value }, index) => {
        return (
          <option key={index} value={value}>
            {name}
          </option>
        )
      })}
      {/* </Select> */}
    </Field>
  )
}
