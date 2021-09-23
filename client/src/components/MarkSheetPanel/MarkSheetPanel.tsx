import { useState } from 'react'
import { marksheetFields } from '../../data/interview/marksheetfields'
import { FormikForm } from '../FormikForm/FormikForm'
import * as yup from 'yup'

const initialValues: any = {
  Input: '',
  Processing: '',
  Output: '',
  'Conceptual-Questions':'',
  'During-live-coding':'',
  Communication:''
}

const admissionFormSchema = yup.object().shape({
  Input: yup.number().required('You missed to give marks here'),
  Processing: yup.number().required('You missed to give marks here'),
  Output: yup.number().required('You missed to give marks here'),
  'Conceptual-Questions':yup.number().required('You missed to give marks here'),
  'During-live-coding':yup.number().required('You missed to give marks here'),
  Communication:yup.number().required('You missed to give marks here')
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
