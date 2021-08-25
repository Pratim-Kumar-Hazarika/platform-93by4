import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import {
  FormikCheckbox,
  FormikField,
  FormikSelect,
  FormikTextarea,
  Layout,
} from '../../components'
import { Breadcrumbs } from './../../components/BreadCrumbs/BreadCrumbs'
import withAuth from '../../context/WithAuth'
import { Formik } from 'formik'
import * as yup from 'yup'
import { theme } from '../../themes'
import { allFields } from '../../data/staticData/allFields'

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
  'financial-aid': string
}

const captilize = (str: string | undefined): string =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : ''

const ifNullEmptyString = (value: string | undefined): string =>
  value ? value : ''

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Must be a valid email address.')
    .required('Email is required.')
    .lowercase(),
  'parent-name': yup.string().required('Parent name is required.'),
  phone: yup
    .string()
    .required('Phone is required.')
    .matches(phoneRegExp, 'Phone number is not valid'),
  password: yup.string().required('Password is required.'),
  state: yup.string().required('State is required.'),
  city: yup.string().required('City is required.'),
  'reason-for-joining': yup
    .string()
    .required('Reason for joining is required.'),
  country: yup.string().required('City is required.'),
  'parent-relation': yup.string().required('Parent relation is required.'),
  'discord-id': yup.string().required('Discord id is required.'),
  'twitter-url': yup.string().required('Twitter url is required.'),
  'telegram-id': yup.string().required('Telegram id is required.'),
  'linkedin-url': yup.string().required('Linkedin url is required.'),
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
  'financial-aid': yup.string().required('Financial aid is required.'),
})

function InterviewForm(): JSX.Element {
  const breadcrumbsLinks = [
    { breadcrumbName: 'Dashboard', breadcrumbLink: '/dashboard' },
    {
      breadcrumbName: 'Interview Form',
      breadcrumbLink: '/interview/form',
    },
  ]
  function handleSubmit(values: TypeFormValues): void {}
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
          initialValues={{
            'reason-for-joining': 'postgraduate',
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
            'financial-aid': '',
          }}
          validationSchema={SignInSchema}
          onSubmit={(values: TypeFormValues) => handleSubmit(values)}
        >
          <Box m="1rem 0" bg="black.800" borderRadius="6px" p="2rem">
            <Stack w={'full'}>
              {allFields.map(({ title, rows }) => {
                return (
                  <Stack w="100%">
                    {title && (
                      <Heading fontSize="xl" pt="1rem">
                        {title}
                      </Heading>
                    )}
                    <Flex w="100%">
                      {rows.map((row) => {
                        return (
                          <Stack
                            spacing={title ? 6 : 0}
                            m={`${title ? 2 : 0}rem 1rem`}
                            flex="1"
                          >
                            {row.map((field) => {
                              switch (field.type) {
                                case 'select':
                                  return (
                                    <FormikSelect key={field.name} {...field} />
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
                                    <FormikField key={field.name} {...field} />
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
              <Button>Submit</Button>
            </Flex>
          </Box>
        </Formik>
      </Flex>
    </Layout>
  )
}

export default withAuth(InterviewForm)
