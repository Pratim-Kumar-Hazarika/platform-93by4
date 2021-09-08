import {
  Flex,
  Heading,
  IconButton,
  HStack,
  Box,
  SimpleGrid,
} from '@chakra-ui/react'
import { useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { daysInMonth } from '../../data/calendar/months'
import { weeks } from '../../data/calendar/week'
import { predictDay } from './Calender.utils'

function CalenderCell({
  text,
  active,
}: {
  text: string | number
  active?: boolean
}) {
  return (
    <Flex
      h="55px"
      w="55px"
      justify="center"
      align="center"
      rounded="full"
      bg={(active && 'brand.500') || ''}
      color={(active && 'black.900') || 'black.400'}
    >
      {text}
    </Flex>
  )
}

export function Calendar() {
  const currentDate = new Date()
  const [selectedDate, setSelectedDate] = useState({
    date: currentDate.getDate(),
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  })
  const initialDayOfMonth = predictDay(
    selectedDate.date,
    selectedDate.month,
    selectedDate.year
  )
  return (
    <Box flex={1}>
      <Flex justify="space-between" pb="2rem">
        <Heading fontSize="1.8rem">
          {daysInMonth[currentDate.getMonth()].name} {currentDate.getFullYear()}
        </Heading>
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
      <SimpleGrid columns={7} spacing={2}>
        {weeks.map((week, index) => {
          return (
            <Flex
              key={index}
              h="55px"
              w="55px"
              justify="center"
              align="center"
              rounded="full"
              color="gray.100"
              fontWeight="semibold"
            >
              {week.short}
            </Flex>
          )
        })}
      </SimpleGrid>
      <SimpleGrid columns={7} spacing={2}>
        {[...Array(35)].map((_, i) => {
          const isToday =
            selectedDate.date === i + 1 &&
            selectedDate.month === currentDate.getMonth() &&
            selectedDate.year === currentDate.getFullYear()
          return <CalenderCell text={i + 1} active={isToday} />
        })}
      </SimpleGrid>
    </Box>
  )
}
