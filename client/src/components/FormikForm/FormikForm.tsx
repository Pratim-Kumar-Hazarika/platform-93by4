import { Button } from '@chakra-ui/button'
import { Box, Flex, Heading, Stack } from '@chakra-ui/layout'
import { Form, Formik } from 'formik'
import { FormikCheckbox, FormikField, FormikSelect, FormikTextarea } from '..'
import { AllFieldsType } from '../../data/interview/allFields'
import { TypeFormValues } from '../../pages/interview/form'

export function FormikForm({
  fields,
  initialValues,
  validationSchema,
  handleSubmit,
  isLoading,
}: {
  fields: Array<AllFieldsType>
  initialValues: TypeFormValues
  validationSchema: any
  handleSubmit: (values: TypeFormValues) => Promise<void>
  isLoading: boolean
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
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
                {fields.map(({ title, rows }) => {
                  return (
                    <Stack w="100%">
                      {title && (
                        <Heading
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
  )
}
