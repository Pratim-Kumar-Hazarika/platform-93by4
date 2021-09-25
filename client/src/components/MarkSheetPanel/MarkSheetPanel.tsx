import { useState } from 'react'
import { marksheetFields } from '../../data/interview/marksheetfields'
import { FormikForm } from '../FormikForm/FormikForm'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { submitMarksheet } from '../../services/axiosService'
import { useToast,Box } from '@chakra-ui/react'
import { response } from 'express'
import { useRouter } from 'next/router'

const initialValues: any = {
  Input: '',
  Processing: '',
  Output: '',
  'Conceptual_Questions':'',
  'During_live_coding':'',
  Communication:'',
  Passing_status:''
}

const admissionFormSchema = yup.object().shape({
  Input: yup.number().max(15).required('You missed to give marks here'),
  Processing: yup.number().max(25).required('You missed to give marks here'),
  Output: yup.number().max(10).required('You missed to give marks here'),
  'Conceptual_Questions':yup.number().max(10).required('You missed to give marks here'),
  'During_live_coding':yup.number().max(10).required('You missed to give marks here'),
  Communication:yup.number().max(10).required('You missed to give marks here'),
})
export const MarkSheetPanel = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const toast = useToast()
  async function handleSubmit(values: any) {  
    console.log({values})
    try {
      const response = await submitMarksheet({
        "codeInput":values.Input,
        "codeProcessing":values.Processing,
        "codeOutput":values.Output,
        "conceptualQuestions":values.Conceptual_Questions ,
        "duringLiveCoding":values?.During_live_coding,
        "communication":values?.Communication,
        "captain":values?.captain_check,
        "financialAid":values?.financial_aid_check,
        "feedbacks":values?.feedback_box,
        "passingStatus":values?.Passing_status ,
        "user":"614f26f4d77fbe5550d398fd" /// will come from context
      })
      if(response.status === 200){
        toast({
          title: 'Marksheet Submitted Successfully',
          description: 'Thank you for the submission',
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
        router.push("/interviewer") /// redirect to dashboard 
      }
    } catch (error) {
      toast({
        title: 'Marksheet Not Submitted',
        description: 'Please Select the Passing Status',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
      console.log("Error Occured",{error})
    }
  }
 
  return (
    <Box color="white"> 
      <FormikForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        validationSchema={admissionFormSchema}
        isLoading={isLoading}
        fields={marksheetFields}
      />
    </Box>
  )
}
