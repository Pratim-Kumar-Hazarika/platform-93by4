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
import { theme } from '../../themes'
import { TimeSlot } from '../TimeSlot/TimeSlot'

export function InterviewSlot({}) {
  return (
    <Flex
      width={'100%'}
      background={theme.colors.black['800']}
      p="2rem 2rem"
      borderRadius={10}
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>
              <Text align="center">Time</Text>
            </Th>
            <Th isNumeric>Buttons</Th>
          </Tr>
        </Thead>
        <Tbody>
          <SingleSlot
            name="John"
            timefrom="8:30pm"
            timeto="9:00"
            isInterviewDone={false}
          />
          <SingleSlot
            name="John"
            timefrom="8:30pm"
            timeto="9:00"
            isInterviewDone={true}
          />
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
    <Tr>
      <Td>
        <Heading fontSize={theme.fontSizes['lg']}>{name}</Heading>
      </Td>
      <Td>
        <TimeSlot variant="ghost" from={timefrom} to={timeto}></TimeSlot>
      </Td>
      <Td isNumeric>
        <Flex flexDir="column" alignItems="flex-end">
          {isInterviewDone ? (
            <Button
              variant="disable"
              rounded="md"
              size="sm"
              maxWidth="150px"
              my={2}
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
                my={2}
              >
                Interview Now
              </Button>
              <Button
                variant="outline"
                rounded="md"
                size="sm"
                maxWidth="150px"
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
