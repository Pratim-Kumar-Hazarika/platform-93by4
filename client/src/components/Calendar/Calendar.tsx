import {
  Flex,
  Heading,
  IconButton,
  HStack,
  Box,
  SimpleGrid,
} from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { daysInMonth } from '../../data/calendar/months'
import { weeks } from '../../data/calendar/week'
import { IDate } from '../../pages/interviewer/add-slot'
import { predictDay } from './Calender.utils'

function CalenderCell({
  text,
  active,
  isCurrentMonth,
  currentDateHandler,
  dateObject,
}: {
  text: string | number
  active?: boolean
  isCurrentMonth?: boolean
  currentDateHandler?: (selectedDate: IDate) => void
  dateObject: IDate
}) {
  return (
    <Flex
      cursor={isCurrentMonth ? 'pointer' : ''}
      h="55px"
      w="55px"
      justify="center"
      align="center"
      rounded="full"
      bg={(active && 'brand.500') || ''}
      color={
        (active && 'black.900') || (isCurrentMonth ? 'black.400' : 'black.600')
      }
      onClick={() =>
        currentDateHandler && isCurrentMonth && currentDateHandler(dateObject)
      }
    >
      {text}
    </Flex>
  )
}

export function Calendar({
  currentDateHandler,
  selectedDate,
  setSelectedDate,
}: {
  currentDateHandler?: (selectedDate: IDate) => void
  selectedDate?: IDate
  setSelectedDate?: Dispatch<SetStateAction<IDate>>
}) {
  const currentDate = new Date()

  const initialDayOfMonth = predictDay(
    1,
    selectedDate!.month + 1,
    selectedDate!.year
  )
  const getPreviousMonth = () => {
    if (setSelectedDate) {
      if (selectedDate?.month === 0) {
        setSelectedDate({
          date: selectedDate.date,
          month: 11,
          year: selectedDate.year - 1,
        })
      } else {
        setSelectedDate({
          date: selectedDate!.date,
          month: selectedDate!.month - 1,
          year: selectedDate!.year,
        })
      }
    }
  }

  const getNextMonth = () => {
    if (setSelectedDate) {
      if (selectedDate?.month === 11) {
        setSelectedDate({
          date: selectedDate!.date,
          month: 0,
          year: selectedDate!.year + 1,
        })
      } else {
        setSelectedDate({
          date: selectedDate!.date,
          month: selectedDate!.month + 1,
          year: selectedDate!.year,
        })
      }
    }
  }

  // console.log(selectedDate, daysInMonth[0])
  return (
    <Box flex={1}>
      <Flex justify="space-between" pb="2rem">
        <Heading fontSize="1.8rem">
          {daysInMonth[selectedDate!.month].name} {selectedDate?.year}
        </Heading>
        <HStack>
          <IconButton
            _hover={{ bg: 'black.600' }}
            bg="black.500"
            rounded="full"
            aria-label="left-chev"
            onClick={() => getPreviousMonth()}
          >
            <BiChevronLeft fontSize="1.5rem" />
          </IconButton>
          <IconButton
            bg="black.500"
            _hover={{ bg: 'black.600' }}
            rounded="full"
            aria-label="right-chev"
            onClick={() => getNextMonth()}
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
        {[...Array(42)].map((_, i) => {
          let calcDate = i + 2 - initialDayOfMonth
          const isToday =
            selectedDate?.date === calcDate &&
            selectedDate?.month === currentDate.getMonth() &&
            selectedDate?.year === currentDate.getFullYear()
          let isCurrentMonth = true
          if (calcDate < 1) {
            calcDate =
              calcDate +
              daysInMonth[
                selectedDate?.month === 0 ? 11 : selectedDate!.month - 1
              ].days
            isCurrentMonth = false
          } else if (calcDate > daysInMonth[selectedDate!.month].days) {
            calcDate = calcDate - daysInMonth[selectedDate!.month].days
            isCurrentMonth = false
          }
          return (
            <CalenderCell
              key={`calender-cell-${i + 1}`}
              text={calcDate}
              active={isToday}
              isCurrentMonth={isCurrentMonth}
              currentDateHandler={currentDateHandler}
              dateObject={{
                date: calcDate,
                month: selectedDate!.month,
                year: selectedDate!.year,
              }}
            />
          )
        })}
      </SimpleGrid>
    </Box>
  )
}
