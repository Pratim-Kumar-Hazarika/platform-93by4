import {
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  Button,
  Text,
  Input,
  useToast,
} from '@chakra-ui/react'
import { useState, ChangeEvent } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { BsPlusCircle } from 'react-icons/bs'
import addSlot from '../../pages/interview/add-slot'
import { addTime } from '../../utils/addTime'
import { TimeSlot } from '../TimeSlot/TimeSlot'

const currentDate = new Date()

export function SlotList() {
  const [showButton, setShowButton] = useState(true)
  const [timeInput, setTimeInput] = useState('')
  const toast = useToast()
  async function timeHandler() {
    const value = timeInput.trim().split(':')
    if (value.length === 2) {
      // updating currentDate time
      currentDate.setHours(Number(value[0]))
      currentDate.setMinutes(Number(value[1]))
      const prevDate = currentDate.toLocaleString()
      const timeAfter30Mins = addTime(currentDate, 30)
      const payload = {
        from: prevDate,
        to: timeAfter30Mins.toLocaleString(),
      }
      const res = await addSlot(payload)

      // toast message
      toast({
        title: 'Time Slot Added',
        description: `Your selected slot ${prevDate} - ${timeAfter30Mins.toLocaleString()} was successfully added`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } else {
      // toast error
      toast({
        title: 'Error',
        description: 'Please enter a valid time',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }
  return (
    <Flex flexDir="column" align="center" flex={1} pl="2rem">
      <Flex justify="space-between" w="full" pb="2rem" maxW="330px">
        <Heading fontSize="1.8rem">Slots Avaliable</Heading>
        <HStack>
          <IconButton
            _hover={{ bg: 'black.600' }}
            bg="black.500"
            rounded="full"
            aria-label="left-chev"
          >
            <BiChevronLeft fontSize="1.5rem" />
          </IconButton>
          <IconButton
            bg="black.500"
            _hover={{ bg: 'black.600' }}
            rounded="full"
            aria-label="right-chev"
          >
            <BiChevronRight fontSize="1.5rem" />
          </IconButton>
        </HStack>
      </Flex>
      <Stack mt={4} spacing={2} w="full" height="full" maxW="300px">
        <TimeSlot from="8:00pm" to="8:30pm" deleteButton />
        <TimeSlot from="8:00pm" to="8:30pm" isDisabled />
      </Stack>
      {showButton ? (
        <Button
          variant="ghost"
          rounded="md"
          size="lg"
          w="full"
          maxW="300px"
          fontSize="lg"
          onClick={() => setShowButton((prev) => !prev)}
        >
          <BsPlusCircle />
          <Text ml="1rem">Add Slot</Text>
        </Button>
      ) : (
        <Flex w="full" maxW="300px">
          <Input
            type="time"
            borderRightRadius="0"
            onChange={(event) => setTimeInput(event?.target?.value)}
          />
          <Button
            onClick={timeHandler}
            borderLeftRadius="0"
            rounded="md"
            size="md"
            fontSize="lg"
          >
            +
          </Button>
        </Flex>
      )}
    </Flex>
  )
}
