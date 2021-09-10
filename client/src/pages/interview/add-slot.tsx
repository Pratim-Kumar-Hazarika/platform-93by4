import { Button } from '@chakra-ui/button'
import { Checkbox } from '@chakra-ui/checkbox'
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/layout'
import { Form, Formik } from 'formik'
import { Breadcrumbs, Calendar, Layout, SlotList } from '../../components'
import { SEO } from '../../components/Layout/SEO'
import withAuth from '../../context/WithAuth'
import { getTimeFromLocalString } from '../../utils/getTimeFromLocalString'

function AddSlot() {
  const breadcrumbsLinks = [
    { breadcrumbName: 'Dashboard', breadcrumbLink: '/dashboard' },
    {
      breadcrumbName: 'Interview',
      breadcrumbLink: '/interview',
    },
    {
      breadcrumbName: 'Add slots',
      breadcrumbLink: '/add-slots',
    },
  ]
  console.log(getTimeFromLocalString('10/9/2021, 12:00:51 pm'))
  return (
    <Layout>
      <SEO title="Add Slots" />
      <Stack spacing={4}>
        <Breadcrumbs breadcrumbProp={breadcrumbsLinks} />
        <Heading pt="0.5rem" color="brand.500">
          Open more slots
        </Heading>
        <Text pb="2rem">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quae
          odit assumenda dolorum laboriosam reprehenderit, officia harum vitae
          nobis in
        </Text>
        <Box>
          <Flex
            w="full"
            bg="black.800"
            p="2rem 2rem"
            rounded="lg"
            borderBottomRadius="0"
          >
            <Calendar />
            <SlotList />
          </Flex>
          <Flex
            w="full"
            bg="black.800"
            p="2rem 2rem"
            rounded="lg"
            borderTopRadius="0"
          >
            <Stack spacing={10} direction="row" w="full">
              <Checkbox colorScheme="brand" defaultIsChecked>
                Checkbox
              </Checkbox>
              <Checkbox colorScheme="brand" defaultIsChecked>
                Checkbox
              </Checkbox>
            </Stack>
            <Button>Submit</Button>
          </Flex>
        </Box>
      </Stack>
    </Layout>
  )
}

export default withAuth(AddSlot)
