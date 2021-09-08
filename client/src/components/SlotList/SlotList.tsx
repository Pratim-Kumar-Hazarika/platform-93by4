import { Flex, Heading, HStack, IconButton, Stack } from '@chakra-ui/react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { TimeSlot } from '../TimeSlot/TimeSlot'

export function SlotList() {
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
      <Stack mt={4} spacing={2} w="full" maxW="300px">
        <TimeSlot from="8:00pm" to="8:30pm" />
        <TimeSlot from="8:00pm" to="8:30pm" isDisabled />
      </Stack>
    </Flex>
  )
}
