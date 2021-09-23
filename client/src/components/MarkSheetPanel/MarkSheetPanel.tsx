import { useState } from 'react'
import { marksheetFields } from '../../data/interview/marksheetfields'
import { FormikForm } from '../FormikForm/FormikForm'
import * as yup from 'yup'
import { Box } from '@chakra-ui/react'
import { theme } from '../../themes'

const initialValues: any = {
  phone: '',
  country: '',
  'parent-name': '',
}

const admissionFormSchema = yup.object().shape({
  'parent-name': yup.string().required('Parent name is required.'),
  phone: yup.string().required('Phone is required.'),
  country: yup.string().required('City is required.'),
})
export const MarkSheetPanel = () => {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(values: any) {
    console.log(values)
  }
  return (
    <>
      <FormikForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        validationSchema={admissionFormSchema}
        isLoading={isLoading}
        fields={marksheetFields}
      />
    </>
  )
}
