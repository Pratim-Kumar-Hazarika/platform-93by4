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
import { useAuth } from '../../context/AuthContext'

export interface TypeFormValues {
  email: string
  'first-name': string
  'reason-for-joining': string
}

const captilize = (str: string | undefined): string =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : ''

const ifNullEmptyString = (value: string | undefined): string =>
  value ? value : ''

const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Must be a valid email address.')
    .required('Email is required.')
    .lowercase(),
  password: yup.string().required('Password is required.'),
})

function InterviewForm(): JSX.Element {
  const { authState } = useAuth()
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
            email: ifNullEmptyString(authState?.user?.email),
            'first-name': captilize(authState?.user?.firstName),
            'last-name': captilize(authState?.user?.lastName),
            'reason-for-joining': 'postgraduate',
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
