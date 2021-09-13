import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { Field, Form, Formik, validateYupSchema, yupToFormErrors } from 'formik'
import { useRouter } from 'next/router'
import { submitReview } from '../../services/axiosService'
import { theme } from '../../themes'
import * as yup from 'yup'

export function NeedsRevisionPanel({ portfolioId }: { portfolioId: string }) {
  // mark15 false before sending
  const router = useRouter()
  const toast = useToast()

  async function handleSubmit(values: any) {
    const response = await submitReview({
      mark15Ready: false,
      portfolioId,
      reviewComment: values.reviewComment,
    })

    if (response.data.code === 'REVIEW_COMPLETE') {
      toast({
        title: 'Thank you for reviewing this portfolio.',
        description: 'You may request for another one or come back later.',
      })
      window.location.pathname = '/admin/dashboard'
    }
    if (response.data.code === 'DUPLICATED_FEEDBACK') {
      toast({
        title: 'Your feedback has already been recorded',
      })
      window.location.pathname = '/admin/dashboard'
    }
  }

  return (
    <>
      <Stack direction={['column']} spacing={4}>
        <Stack direction={['column']} spacing={3}>
          <Box
            bg={theme.colors.black['700']}
            border="1px"
            borderColor={theme.colors.black['600']}
            px={{ base: 4, sm: 6 }}
            py="5"
            rounded="md"
          >
            <Heading fontSize="2xl">Needs Work</Heading>
            <Text mt="2">
              If this portfolio needs work or the projects are not up to the
              mark, feel free to submit your feedback in this field. While
              submitting feedback, please make sure to highlight areas that they
              need to work on. Not sure about feedback points ? Please go
              through guidelines here.
            </Text>
          </Box>
          <Box
            bg={theme.colors.black['700']}
            border="1px"
            borderColor={theme.colors.black['600']}
            px={{ base: 4, sm: 6 }}
            py="5"
            rounded="md"
          >
            <Formik
              initialValues={{
                reviewComment: '',
              }}
              validationSchema={yup.object({
                reviewComment: yup
                  .string()
                  .min(20, 'A longer review is expected.'),
              })}
              onSubmit={(values) => handleSubmit(values)}
            >
              <Form>
                <Field name="reviewComment">
                  {({ field, form }: { field: any; form: any }) => (
                    <FormControl
                      mt={1}
                      isInvalid={
                        form.errors.reviewComment && form.errors.reviewComment
                      }
                    >
                      <FormLabel
                        htmlFor="reviewComment"
                        fontSize="sm"
                        fontWeight="bold"
                      >
                        Your Feedback
                      </FormLabel>

                      <Textarea
                        {...field}
                        placeholder="Your feedback"
                        id="reviewComment"
                        mt={1}
                        rows={3}
                        shadow="sm"
                        focusBorderColor="brand.400"
                        fontSize={{ sm: 'sm' }}
                      />
                      <FormErrorMessage>
                        {form.errors.reviewComment}
                      </FormErrorMessage>
                      <FormHelperText>
                        This feedback is visible to student through their
                        dashboard.
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>
                <Field>
                  {({ field, form }: { field: any; form: any }) => (
                    <Flex mt={4}>
                      <Button disabled={!form.isValid} type="submit">
                        Submit
                      </Button>
                    </Flex>
                  )}
                </Field>
              </Form>
            </Formik>
          </Box>
        </Stack>
      </Stack>
    </>
  )
}
