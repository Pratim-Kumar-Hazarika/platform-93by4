import {
  Button,
  Flex,
  Heading,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
} from '@chakra-ui/react'
import { AlertDialogBox, Layout } from '../../components'
import { SEO } from '../../components/Layout/SEO'
import withAuth from '../../context/WithAuth'

export function Scheduled() {
  return (
    <Layout>
      <SEO title="Scheduled Interview" />
      <Flex
        align="center"
        flexDir="column"
        w="full"
        bg="black.800"
        p="2rem 2rem"
        rounded="lg"
      >
        <Heading color="brand.500" pb="1rem" w="full">
          You Interview has been scheduled
        </Heading>
        <Text w="full">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          ipsam.
        </Text>
        <Flex
          justify="center"
          maxW="400px"
          bg="black.700"
          rounded="md"
          p="1rem"
          m="2rem 0"
        >
          <Table size="sm">
            <Tbody>
              <Tr>
                <Th borderColor="transparent" outlineColor="transparent">
                  Link
                </Th>
                <Td
                  borderColor="transparent"
                  outlineColor="transparent"
                  isTruncated
                >
                  https://meet.google.com/ajbdjbas-asndjn
                </Td>
              </Tr>
              <Tr>
                <Th borderColor="transparent" outlineColor="transparent">
                  Date
                </Th>
                <Td borderColor="transparent" outlineColor="transparent">
                  Webnesday, 14th August
                </Td>
              </Tr>
              <Tr>
                <Th borderColor="transparent" outlineColor="transparent">
                  Time
                </Th>
                <Td borderColor="transparent" outlineColor="transparent">
                  5:00pm - 5:30pm
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
        <Flex w="full" justify="space-between">
          <Button variant="ghost" color="brand.500">
            Cancel Interview
          </Button>
          <Stack direction="row">
            <AlertDialogBox
              text="Reschedule Interview"
              title="Are you sure?"
              btnProps={{
                variant: 'outline',
              }}
            />
            <Button as={'a'} href="/dashboard">
              Go back to DashBoard
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default withAuth(Scheduled)
