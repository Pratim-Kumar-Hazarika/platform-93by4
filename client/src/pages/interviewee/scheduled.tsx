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
import useIntervieweeDetails from '../../context/IntervieweeContext'
import withAuth from '../../context/WithAuth'
import { timeformatAMPM } from '../../utils/timeformatAMPM'

export function Scheduled() {
  const { intervieweeState } = useIntervieweeDetails()
  const bookSlot = intervieweeState?.bookedSlots?.find(
    (slotItem) => slotItem.status === 'booked'
  )
  console.log({ bookSlot }, intervieweeState?.bookedSlots)
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
                  {bookSlot?.link}
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
                {bookSlot && (
                  <Td borderColor="transparent" outlineColor="transparent">
                    {timeformatAMPM(new Date(bookSlot.from))} -{' '}
                    {timeformatAMPM(new Date(bookSlot.to))}
                  </Td>
                )}
              </Tr>
            </Tbody>
          </Table>
        </Flex>
        <Flex w="full" justify="space-between">
          <AlertDialogBox
            btntext="Cancel Interview"
            title="Cancel Interview"
            btnProps={{
              variant: 'ghost',
            }}
            description="Are you sure you want to cancel your interview?"
            callback={() => console.log('34')}
          />
          <Stack direction="row">
            <AlertDialogBox
              btntext="Reschedule Interview"
              title="Reschedule Interview"
              btnProps={{
                variant: 'outline',
              }}
              description="Are you sure you want to reschedule your interview?"
              callback={() => console.log('35')}
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
