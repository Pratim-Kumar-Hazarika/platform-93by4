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
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { BsPlusCircle } from 'react-icons/bs'
import { ISlot } from '../../context/InterviewerContext'
import { timeformatAMPM } from '../../utils/timeformatAMPM'
import { TimeSlot } from '../TimeSlot/TimeSlot'

export function SlotList({
  title,
  timeHandler,
  setTimeInput,
  deleteSlotHandler,
  interviewSlots,
  slotClickHandler,
  addTimeInputVisibility,
  onClick,
  needAddButton,
  deleteButton,
  selectField,
}: {
  title: string
  interviewSlots: Array<ISlot>
  addTimeInputVisibility?: boolean
  timeHandler?: () => Promise<void>
  slotClickHandler?: (soltId: string) => Promise<void>
  deleteSlotHandler?: (soltId: string) => Promise<void>
  setTimeInput?: Dispatch<SetStateAction<string>>
  onClick?: Dispatch<SetStateAction<boolean>>
  needAddButton?: boolean
  deleteButton?: boolean
  selectField?: ReactNode
}) {
  interviewSlots.sort((a: any, b: any) => {
    return new Date(a.from).getTime() - new Date(b.from).getTime()
  })

  return (
    <Flex flexDir="column" align="center" flex={1} pl="2rem">
      <Flex justify="space-between" w="full" pb="2rem" maxW="330px">
        {selectField ? (
          selectField
        ) : (
          <Heading fontSize="1.8rem">{title}</Heading>
        )}
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
        {/* <TimeSlot from="8:00pm" to="8:30pm" deleteButton />
        <TimeSlot from="8:00pm" to="8:30pm" isDisabled /> */}
        {interviewSlots &&
          interviewSlots.map((slot) => {
            const fromTime = timeformatAMPM(new Date(slot.from))
            const toTime = timeformatAMPM(new Date(slot.to))
            return (
              <TimeSlot
                key={`time-slot-${slot?._id}`}
                _id={slot?._id || ''}
                from={fromTime}
                to={toTime}
                onClick={slotClickHandler}
                deleteHandler={
                  deleteSlotHandler || (async (soltId: string) => {})
                }
                deleteButton={deleteButton}
              />
            )
          })}
      </Stack>
      {needAddButton && (
        <>
          {!addTimeInputVisibility ? (
            <Button
              variant="ghost"
              rounded="md"
              size="lg"
              w="full"
              maxW="300px"
              fontSize="lg"
              onClick={() => onClick && onClick((prev) => !prev)}
            >
              <BsPlusCircle />
              <Text ml="1rem">Add Slot</Text>
            </Button>
          ) : (
            <Flex w="full" maxW="300px">
              <Input
                type="time"
                borderRightRadius="0"
                onChange={(event) =>
                  setTimeInput && setTimeInput(event?.target?.value)
                }
              />
              <Button
                onClick={timeHandler || (async () => {})}
                borderLeftRadius="0"
                rounded="md"
                size="md"
                fontSize="lg"
              >
                +
              </Button>
            </Flex>
          )}
        </>
      )}
    </Flex>
  )
}
