import { useDisclosure } from '@chakra-ui/core'
import {
  Box,
  Flex,
  Text,
  Stack,
  Input,
  Modal,
  Button,
  Divider,
  Heading,
  useToast,
  FormLabel,
  ModalBody,
  ModalHeader,
  FormControl,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { theme } from '../../themes'
import * as yup from 'yup'
import { submitReview } from '../../services/axiosService'
import { useRouter } from 'next/router'

const MarkValidationSchema = yup.object().shape({
  projects: yup
    .number()
    .positive('Marks must be positive.')
    .min(1, 'Assign marks greater than 1.')
    .max(15)
    .required('Project marks are required.'),
  blogs: yup
    .number()
    .positive('Marks must be positive.')
    .min(1, 'Assign marks greater than 1')
    .max(2)
    .required('Marks for blogs are required.'),
  effort: yup
    .number()
    .positive('Marks must be positive.')
    .min(0)
    .max(1)
    .required('Marks for effort are required.'),
  linkedin: yup
    .number()
    .positive('Marks must be positive.')
    .min(0)
    .max(2)
    .required('Marks for LinkedIn presence are required.'),
})

export function MarkPanel({ portfolioId }: { portfolioId: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const router = useRouter()

  async function handleSubmit(values: any) {
    const response = await submitReview({
      mark15Ready: true,
      portfolioId,
      ...values,
    })

    if (response.data.code === 'REVIEW_COMPLETE') {
      toast({
        title: 'Thank you for reviewing this portfolio.',
        description:
          'Your review has been recieved. Take a break or review more. You will now be redirected to dashboard.',
        status: 'success',
      })
    }

    if (response.data.code === 'DUPLICATED_FEEDBACK') {
      toast({
        title:
          'The feedback for this portfolio has been already submitted by you.',
      })
    }
    onClose()

    router.push('/admin/dashboard')
  }

  return (
    <>
      <Stack direction={['column']} spacing={4}>
        <Box
          bg={theme.colors.black['700']}
          border="1px"
          borderColor={theme.colors.black['600']}
          px={{ base: 4, sm: 6 }}
          py="5"
          rounded="md"
        >
          <Heading fontSize="2xl">Advance to mark15 Ready.</Heading>
          <Text mt="2">
            If this portfolio has ticked all the boxes, you can go ahead and
            assign marks in the following fields.
          </Text>
          <Divider my={3} />
          <Box>
            <Text>Marks distribution for portfolio and projects.</Text>
            {/*  marks table start */}
            <Box>
              <Formik
                initialValues={{
                  projects: 0,
                  blogs: 0,
                  effort: 0,
                  linkedin: 0,
                }}
                validationSchema={MarkValidationSchema}
                onSubmit={(values) => handleSubmit(values)}
              >
                {({ submitForm, isValid, dirty }) => (
                  <Form>
                    <Flex alignItems="center">
                      <Box py={4} flex={0.7}>
                        <Box flex="1">
                          <Box as="h4" fontWeight="bold" maxW="xl">
                            <FormLabel>Projects (Out of 15)</FormLabel>
                          </Box>
                          <Box maxW={{ base: 'xs', md: 'unset' }} fontSize="sm">
                            Rate their projects out of 15.
                          </Box>
                        </Box>
                      </Box>
                      <Box flex={0.3}>
                        <Field name="projects">
                          {({ field, form }: { field: any; form: any }) => (
                            <FormControl
                              isInvalid={
                                form.errors.projects && form.touched.projects
                              }
                            >
                              <Input
                                {...field}
                                type="number"
                                max="15"
                                min="1"
                              />
                              <FormErrorMessage>
                                {form.errors.projects}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                    </Flex>

                    <Flex alignItems="center">
                      <Box py={4} flex={0.7}>
                        <Box flex="1">
                          <Box as="h4" fontWeight="bold" maxW="xl">
                            <FormLabel>Blogs (Out of 2)</FormLabel>
                          </Box>
                          <Box maxW={{ base: 'xs', md: 'unset' }} fontSize="sm">
                            Rate their blogs out of 2
                          </Box>
                        </Box>
                      </Box>
                      <Box flex={0.3}>
                        <Field name="blogs">
                          {({ field, form }: { field: any; form: any }) => (
                            <FormControl
                              isInvalid={
                                form.errors.blogs && form.touched.blogs
                              }
                            >
                              <Input {...field} type="number" />
                              <FormErrorMessage>
                                {form.errors.blogs}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                    </Flex>

                    <Flex alignItems="center">
                      <Box py={4} flex={0.7}>
                        <Box flex="1">
                          <Box as="h4" fontWeight="bold" maxW="xl">
                            <FormLabel>Extra Efforts (Out of 1)</FormLabel>
                          </Box>
                          <Box maxW={{ base: 'xs', md: 'unset' }} fontSize="sm">
                            If they have done some extra effort, you can feel
                            free to rate it.
                          </Box>
                        </Box>
                      </Box>
                      <Box flex={0.3}>
                        <Field name="effort">
                          {({ field, form }: { field: any; form: any }) => (
                            <FormControl
                              isInvalid={
                                form.errors.effort && form.touched.effort
                              }
                            >
                              <Input {...field} type="number" />
                              <FormErrorMessage>
                                {form.errors.effort}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                    </Flex>

                    <Flex alignItems="center">
                      <Box py={4} flex={0.7}>
                        <Box flex="1">
                          <Box as="h4" fontWeight="bold" maxW="xl">
                            <FormLabel>LinkedIn Presence (Out of 2)</FormLabel>
                          </Box>
                          <Box maxW={{ base: 'xs', md: 'unset' }} fontSize="sm">
                            Whether they have any work put on LinkedIn.
                          </Box>
                        </Box>
                      </Box>
                      <Box flex={0.3}>
                        <Field name="linkedin">
                          {({ field, form }: { field: any; form: any }) => (
                            <FormControl
                              isInvalid={
                                form.errors.linkedin && form.touched.linkedin
                              }
                            >
                              <Input {...field} type="number" max="2" />
                              <FormErrorMessage>
                                {form.errors.linkedin}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                    </Flex>
                    <Flex direction="row-reverse">
                      <Button disabled={!isValid || !dirty} onClick={onOpen}>
                        Mark as Ready
                      </Button>
                    </Flex>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent bg={theme.colors.black['700']}>
                        <ModalHeader>Are you sure ?</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          Are you sure to mark this portfolio as mark15Ready ?
                          This action cannot be undone.
                        </ModalBody>

                        <ModalFooter>
                          <Button variant="ghost" mr={3} onClick={onClose}>
                            Cancel
                          </Button>
                          <Button onClick={submitForm}>Submit</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Form>
                )}
              </Formik>
            </Box>
            {/* Marks table end */}
          </Box>
        </Box>
      </Stack>
    </>
  )
}
