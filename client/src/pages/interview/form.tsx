import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import {
  FormikCheckbox,
  FormikField,
  FormikSelect,
  FormikTextarea,
  Layout,
} from '../../components'
import { Breadcrumbs } from './../../components/BreadCrumbs/BreadCrumbs'
import withAuth from '../../context/WithAuth'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { theme } from '../../themes'
import { allFields } from '../../data/staticData/allFields'
import { useAuth } from '../../context/AuthContext'
import { admissionFormSubmission } from '../../services/axiosService'

export interface TypeFormValues {
  'reason-for-joining': string
  'parent-name': string
  phone: string
  country: string
  'parent-relation': string
  state: string
  city: string
  'discord-id': string
  'twitter-url': string
  'telegram-id': string
  'linkedin-url': string
  'educational-status': string
  'have-cs-background': string
  'education-status-brief': string
  'selection-reason': string
  'how-you-get-to-know-about-neog': string
  'mode-of-payment': string
  'year-of-graduation': string
  'financial-aid-check': string
  'correct-info-check': string
  'agree-policy-check': string
}

const captilize = (str: string | undefined): string =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : ''

const ifNullEmptyString = (value: string | undefined): string =>
  value ? value : ''

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const twitterUrlRegExp =
  /^(https:\/\/)(www\.)?twitter\.com\/(#!\/)?[a-zA-Z0-9_]+(\/)?$/

const linkedinUrlRegExp =
  /^(https:\/\/)(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_]+(\/)?$/

const yearOfGraduationRegExp = /^\d{4}$/

const discordIdRegExp = /^.*#\d{4}$/

const AdmissionFormSchema = yup.object().shape({
  'parent-name': yup.string().required('Parent name is required.'),
  phone: yup
    .string()
    .required('Phone is required.')
    .matches(phoneRegExp, 'Phone number is not valid'),
  state: yup.string().required('State is required.'),
  city: yup.string().required('City is required.'),
  'reason-for-joining': yup
    .string()
    .required('Reason for joining is required.'),
  country: yup.string().required('City is required.'),
  'parent-relation': yup.string().required('Parent relation is required.'),
  'discord-id': yup
    .string()
    .matches(discordIdRegExp, 'Discord ID must be in the format of Ramesh#XXXX')
    .required('Discord id is required.'),
  'telegram-id': yup.string(),
  'twitter-url': yup
    .string()
    .matches(twitterUrlRegExp, 'Twitter url is not valid.'),
  'linkedin-url': yup
    .string()
    .matches(linkedinUrlRegExp, 'Linkedin url is not valid.')
    .required('Linkedin url is required.'),
  'educational-status': yup
    .string()
    .required('Educational status is required.'),
  'have-cs-background': yup
    .string()
    .required('Have cs background is required.'),
  'education-status-brief': yup
    .string()
    .required('Education status brief is required.'),
  'selection-reason': yup.string().required('Selection reason is required.'),
  'mode-of-payment': yup.string().required('Mode of payment is required.'),
  'year-of-graduation': yup
    .string()
    .matches(yearOfGraduationRegExp, 'Year of graduation is not valid.')
    .required('Year of graduation is required.'),
  'financial-aid-check': yup.string(),
  'correct-info-check': yup
    .string()
    .required('Correct info check is required.'),
  'agree-policy-check': yup
    .string()
    .required('Agree policy check is required.'),
})

const currentDate = new Date()

function InterviewForm(): JSX.Element {
  const { authState } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const breadcrumbsLinks = [
    { breadcrumbName: 'Dashboard', breadcrumbLink: '/dashboard' },
    {
      breadcrumbName: 'Interview Form',
      breadcrumbLink: '/interview/form',
    },
  ]
  const initialValues: TypeFormValues = {
    'parent-relation': '',
    phone: '',
    country: '',
    'parent-name': '',
    state: '',
    city: '',
    'discord-id': '',
    'twitter-url': '',
    'telegram-id': '',
    'linkedin-url': '',
    'educational-status': '',
    'have-cs-background': '',
    'education-status-brief': '',
    'selection-reason': '',
    'how-you-get-to-know-about-neog': '',
    'reason-for-joining': 'postgraduate',
    'mode-of-payment': '',
    'year-of-graduation': '',
    'financial-aid-check': '',
    'correct-info-check': '',
    'agree-policy-check': '',
  }
  async function handleSubmit(values: TypeFormValues) {
    console.log(values, 'values')
    try {
      if (
        Number(values['year-of-graduation']) <=
        Number(currentDate.getFullYear()) + 1
      ) {
        const response = await admissionFormSubmission(values)
        if (response?.data?.success) {
          toast({
            title: 'Success',
            description: 'Form submitted successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        } else {
          toast({
            title: 'Error',
            description: 'Something went wrong',
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      } else {
        // inform user that he can't appy for financial aid
        toast({
          title: 'Uncheck Financial Aid Checkbox',
          description: 'You can not apply for financial aid for this year',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (e) {
      console.log(e)
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }
  return (
    <Layout>
      <Breadcrumbs breadcrumbProp={breadcrumbsLinks} />
      <Flex flexDir="column">
        <Heading
          w="100%"
          m="1rem 0"
          fontSize="4xl"
          color={theme.colors.brand['500']}
        >
          Fill the admission form
        </Heading>
        <Text mb="2rem">Fill your addmission form to proceed</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={AdmissionFormSchema}
          onSubmit={(values: TypeFormValues) => handleSubmit(values)}
        >
          {({ isValid }: { isValid: boolean }) => {
            return (
              <Form>
                <Box
                  m="1rem 0"
                  bg="black.800"
                  borderRadius="6px"
                  p={{ base: '1rem', md: '2rem' }}
                >
                  <Stack w="full">
                    {allFields.map(({ title, rows }) => {
                      return (
                        <Stack w="100%">
                          {title && (
                            <Heading
                              bg="red"
                              textAlign={{ base: 'center', md: 'left' }}
                              fontSize="xl"
                              pt="1rem"
                            >
                              {title}
                            </Heading>
                          )}
                          <Flex w="100%" flexWrap="wrap">
                            {rows.map((row) => {
                              return (
                                <Stack
                                  spacing={title ? 6 : 0}
                                  m={`${title ? 2 : 0}rem 1rem`}
                                  flex="1"
                                  minW="250px"
                                >
                                  {row.map((field) => {
                                    switch (field.type) {
                                      case 'select':
                                        return (
                                          <FormikSelect
                                            key={field.name}
                                            {...field}
                                          />
                                        )
                                      case 'textarea':
                                        return (
                                          <FormikTextarea
                                            key={field.name}
                                            {...field}
                                          />
                                        )
                                      case 'checkbox':
                                        return (
                                          <FormikCheckbox
                                            key={field.name}
                                            {...field}
                                          />
                                        )
                                      default:
                                        return (
                                          <FormikField
                                            key={field.name}
                                            {...field}
                                          />
                                        )
                                    }
                                  })}
                                </Stack>
                              )
                            })}
                          </Flex>
                        </Stack>
                      )
                    })}
                  </Stack>
                  <Flex justifyContent="flex-end" mt="3.5rem">
                    <Button
                      type="submit"
                      colorscheme="blue"
                      variant="solid"
                      isLoading={isLoading}
                      loadingText="Please wait"
                      isDisabled={!isValid}
                    >
                      Submit
                    </Button>
                  </Flex>
                </Box>
              </Form>
            )
          }}
        </Formik>
      </Flex>
    </Layout>
  )
}

export default withAuth(InterviewForm)
