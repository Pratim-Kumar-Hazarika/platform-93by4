import {
  Flex,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Image,
  Button,
  Link,
  FormErrorMessage,
  Checkbox,
  useToast,
} from '@chakra-ui/react'
import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { Navbar, AuthLayout, FormikSelect } from '../../../components'
import { adminLogin, login } from '../../../services/axiosService'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAdminAuth } from '../../../context/AdminContext'
import { policy } from '../../../utils/policy'

export interface LoginValues {
  email: string
  password: string
  as: string
}
// @TODO - move this to seperate file
const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Must be a valid email address.')
    .required('Email is required.'),
  password: yup.string().required('Password is required.'),
  hasReadGuide: yup.bool().oneOf([true], 'Please make sure to check this.'),
  hasAcceptedRole: yup.bool().oneOf([true], 'Please make sure to check this.'),
  as: yup.string().oneOf(['reviewer', 'interviewer'], ''),
})

export default function Login() {
  const router = useRouter()
  const { authState, setAuthState } = useAdminAuth()
  const toast = useToast()

  const [checkboxToggle, setCheckboxToggle] = React.useState({
    guideCheck: false,
    responsibitiesCheck: false,
  })

  async function handleSubmit(data: LoginValues) {
    const res = await adminLogin({
      email: data.email,
      password: data.password,
      as: data.as,
    })

    if (res.data.code === 'LOGGED_IN') {
      localStorage.setItem('x-auth-token', res.data.token)

      setAuthState({
        admin: res.data.adminInfo,
        isAuthenticated: true,
        isLoading: false,
      })

      // withAdminAuth will redirect to other dashboard if this is not accessible
      router.push('/admin/dashboard')
    }

    if (res.data.code === 'BAD_CREDENTIALS') {
      localStorage.removeItem('x-auth-token')
      toast({
        title: 'Wrong email or password',
        description: 'Please check email or password.',
      })
      setAuthState({
        admin: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }

    if (res.data.code === 'INTERNAL_ERROR') {
      localStorage.removeItem('x-auth-token')
      toast({
        title: 'Something went wrong',
        description: 'Please try again.',
      })
    }
  }

  return (
    <>
      <Head>
        <title>Login | neoG.Camp</title>
      </Head>
      <Navbar />
      <AuthLayout>
        <Flex flex={1} d={{ base: 'none', md: 'flex' }}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src="https://unsplash.com/photos/SmkZz4aR-Ng/download?force=true"
            width="100%"
          />
        </Flex>

        <Flex
          p={['2rem', '2rem 3rem']}
          flex={1}
          align={'center'}
          justify={'center'}
        >
          <Stack spacing={8} w={'full'} maxW={'lg'}>
            <Heading fontSize={'4xl'} color="brand.500">
              Login
            </Heading>
            <Formik
              initialValues={{
                email: '',
                password: '',
                hasAcceptedRole: false,
                hasReadGuide: false,
                as: '',
              }}
              validationSchema={SignInSchema}
              onSubmit={(values: LoginValues) => handleSubmit(values)}
            >
              <Form>
                <Stack spacing={8}>
                  <Field name="email">
                    {/* These have no typedefinitions from formik itself. */}
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel htmlFor="email" color="white">
                          Email Address
                        </FormLabel>
                        <Input
                          {...field}
                          id="email"
                          placeholder="you@example.com"
                          type="email"
                          color="white"
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel htmlFor="password" color="white">
                          Password
                        </FormLabel>
                        <Input
                          {...field}
                          id="password"
                          placeholder="Your password"
                          type="password"
                          color="white"
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field>
                    {({ field, form }: { field: any; form: any }) => (
                      <FormikSelect
                        {...field}
                        name={'as'}
                        isRequired={true}
                        type={''}
                        placeHolder={'Login as'}
                        options={[
                          { name: 'reviewer', value: 'reviewer' },
                          { name: 'interviewer', value: 'interviewer' },
                        ]}
                      />
                    )}
                  </Field>

                  <Stack spacing={4}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}
                    >
                      <Link
                        href="/auth/forgot-password/"
                        fontStyle="italic"
                        fontSize="sm"
                        color="black.200"
                      >
                        Forgot password?
                      </Link>
                    </Stack>
                    <Stack>
                      <Field name="hasReadGuide">
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl>
                            <Checkbox
                              {...field}
                              type="checkbox"
                              mr={2}
                              id="hasReadGuide"
                            >
                              I have read the guide and ready to review.
                            </Checkbox>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="hasAcceptedRole">
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl>
                            <Checkbox
                              {...field}
                              type="checkbox"
                              mr={2}
                              id="hasAcceptedRole"
                            >
                              I accept the role & responsibilities.
                            </Checkbox>
                          </FormControl>
                        )}
                      </Field>
                    </Stack>
                    <Flex justify="space-between" align="center">
                      <Button
                        variant="link"
                        color="white"
                        onClick={() => router.push('/auth/admin/apply')}
                      >
                        Apply to be a Reviewer
                      </Button>
                      <Field>
                        {({ form }: { form: any }) => (
                          <Button
                            type="submit"
                            colorScheme={'brand'}
                            variant={'solid'}
                            textColor={'black.800'}
                            disabled={!form.isValid}
                          >
                            Login
                          </Button>
                        )}
                      </Field>
                    </Flex>
                  </Stack>
                </Stack>
              </Form>
            </Formik>
          </Stack>
        </Flex>
      </AuthLayout>
    </>
  )
}
