import {
  Thead,
  Tbody,
  Flex,
  Heading,
  Text,
  Button,
  Table,
  Tr,
  Td,
  Th,
} from '@chakra-ui/react'
import { TimeSlot } from '..'
import { ISlot } from '../../context/InterviewerContext'
import { timeformatAMPM } from '../../utils/timeformatAMPM'

export function InterviewSlot({ slots }: { slots: ISlot[] }) {
  console.log({ slots })

  return (
    <Flex width={'100%'} bg="black.800" p="1rem 2rem" borderRadius={10}>
      <Table variant="simple" bg="black.800">
        <Thead>
          <Tr borderBottom="1px solid" borderColor="black.700">
            <Th border="none">Name</Th>
            <Th border="none">
              <Text align="center">Time</Text>
            </Th>
            <Th border="none" isNumeric>
              <Text align="center">Action</Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {slots.map((slot) => {
            return (
              <SingleSlot
                name={slot.interviewee!.firstName}
                timefrom={timeformatAMPM(new Date(slot.from))}
                timeto={timeformatAMPM(new Date(slot.to))}
                isInterviewDone={false}
              />
            )
          })}
        </Tbody>
      </Table>
    </Flex>
  )
}

type TSingleSlot = {
  name: string
  timefrom: string
  timeto: string
  isInterviewDone?: boolean
}

const SingleSlot = ({
  name,
  timefrom,
  timeto,
  isInterviewDone,
}: TSingleSlot) => {
  return (
    <Tr
      borderBottom="1px solid"
      borderColor="black.700"
      _last={{
        borderBottom: 'none',
        outline: 'none',
      }}
    >
      <Td border="none">
        <Heading fontSize="lg">{name}</Heading>
      </Td>
      <Td border="none">
        <TimeSlot _id="" variant="ghost" from={timefrom} to={timeto}></TimeSlot>
      </Td>
      <Td border="none" isNumeric>
        <Flex flexDir="column" alignItems="flex-end">
          {isInterviewDone ? (
            <Button
              variant="disabled"
              rounded="md"
              size="sm"
              maxWidth="150px"
              my={2}
              w="full"
              isDisabled
            >
              Interview Done
            </Button>
          ) : (
            <>
              <Button
                variant="solid"
                rounded="md"
                size="sm"
                maxWidth="150px"
                w="full"
                my={2}
              >
                Interview Now
              </Button>
              <Button
                variant="outline"
                rounded="md"
                size="sm"
                maxWidth="150px"
                w="full"
                my={2}
              >
                Cancel Interview
              </Button>
            </>
          )}
        </Flex>
      </Td>
    </Tr>
  )
}
