import {
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  Button,
  Text,
  Input,
} from '@chakra-ui/react'
import { useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { BsPlusCircle } from 'react-icons/bs'
import { TimeSlot } from '../TimeSlot/TimeSlot'

export function SlotList() {
  const [showButton, setShowButton] = useState(true)
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
            onChange={(e) => console.log(e?.target?.value)}
          />
          <Button borderLeftRadius="0" rounded="md" size="md" fontSize="lg">
            +
          </Button>
        </Flex>
      )}
    </Flex>
  )
}
