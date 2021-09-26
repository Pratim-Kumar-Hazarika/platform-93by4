import { Button } from '@chakra-ui/button'
import { Checkbox } from '@chakra-ui/checkbox'
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/layout'
import { useToast, Select } from '@chakra-ui/react'
import { useState } from 'react'
import { Breadcrumbs, Calendar, Layout, SlotList } from '../../components'
import useInterviewerDetails from '../../context/InterviewerContext'
import withAdminAuth from '../../context/WithAdminAuth'
import { deleteInterviewerSlot, addTimeSlot } from '../../services/axiosService'
import { addTime } from '../../utils/addTime'
import { policy } from '../../utils/policy'
import { timeformatAMPM } from '../../utils/timeformatAMPM'

const currentDate = new Date()

const SelectField = ({
  options,
}: {
  options: Array<{ label: string; value: string }>
}) => {
  return (
    <Select mr={5}>
      {options.map((slot) => (
        <option key={`interviewer-slots-type-${slot.value}`} value={slot.value}>
          {slot.label}
        </option>
      ))}
    </Select>
  )
}

export interface IDate {
  date: number
  month: number
  year: number
}

function AddSlot() {
  const breadcrumbsLinks = [
    { breadcrumbName: 'Dashboard', breadcrumbLink: '/interviewer' },
    {
      breadcrumbName: 'Add slots',
      breadcrumbLink: '/add-slots',
    },
  ]
  const toast = useToast()
  const { interviewerDispatch, interviewerState } = useInterviewerDetails()
  const [timeInput, setTimeInput] = useState('')
  const [addTimeInputVisibility, setAddTimeInputVisibility] = useState(false)
  const [selectedDate, setSelectedDate] = useState({
    date: currentDate.getDate(),
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  })

  async function deleteSlotHandler(slotId: string) {
    console.log(slotId)
    const deleteResponse = await deleteInterviewerSlot(slotId)
    if (deleteResponse.status === 200) {
      interviewerDispatch({
        type: 'DELETE_SLOT',
        payload: slotId,
      })
      // toast success
      toast({
        title: 'Slot deleted successfully',
        description: 'The slot has been deleted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  async function timeHandler() {
    const value = timeInput.trim().split(':')
    if (value.length === 2) {
      // updating currentDate time
      currentDate.setHours(Number(value[0]))
      currentDate.setMinutes(Number(value[1]))
      const prevDate = currentDate.toISOString()
      const timeAfter30Mins = addTime(currentDate, 30)

      if(timeAfter30Mins === "Time is not valid"){
        toast({
          title: 'Error',
          description: 'You can select time after 8am only!!',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        return false;
      }
      const payload = {
        from: prevDate,
        to: timeAfter30Mins.toISOString(),
      }
      // const res = await addTimeSlot(payload)

      // if (res.status === 200) {
      //   interviewerDispatch({
      //     type: 'ADD_SLOT',
      //     payload: res.data?.slot,
      //   })
      //   // toast message
      //   toast({
      //     title: 'Time Slot Added',
      //     description: `Your selected slot at ${timeformatAMPM(
      //       new Date(prevDate)
      //     )} has been added !!!`,
      //     status: 'success',
      //     duration: 9000,
      //     isClosable: true,
      //   })
      // }
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

  const currentDateHandler = (selectedDate: IDate) => {
    setSelectedDate(selectedDate)
  }

  return (
    <Layout title="Add Slots">
      <Stack spacing={4}>
        <Breadcrumbs breadcrumbProp={breadcrumbsLinks} />
        <Heading pt="0.5rem" color="brand.500">
          Open more slots
        </Heading>
        <Text pb="2rem">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quae
          odit assumenda dolorum laboriosam reprehenderit, officia harum vitae
          nobis in
        </Text>
        <Box>
          <Flex
            w="full"
            bg="black.800"
            p="2rem 2rem"
            rounded="lg"
            borderBottomRadius="0"
          >
            <Calendar
              currentDateHandler={currentDateHandler}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <SlotList
              title="Add Slots"
              timeHandler={timeHandler}
              deleteSlotHandler={deleteSlotHandler}
              key={`slot-list-${interviewerState?.slots?.length}`}
              setTimeInput={setTimeInput}
              interviewSlots={interviewerState?.slots || []}
              addTimeInputVisibility={addTimeInputVisibility}
              onClick={setAddTimeInputVisibility}
              selectField={
                <SelectField
                  options={[
                    {
                      label: 'Open Slots',
                      value: 'open-slots',
                    },
                    {
                      label: 'Booked Slots',
                      value: 'booked-slots',
                    },
                    {
                      label: 'Cancelled Slots',
                      value: 'cancelled-slots',
                    },
                  ]}
                />
              }
              deleteButton
              needAddButton
            />
          </Flex>
          <Flex
            w="full"
            bg="black.800"
            p="2rem 2rem"
            rounded="lg"
            borderTopRadius="0"
          >
            <Stack spacing={10} direction="row" w="full">
              <Checkbox colorScheme="brand" defaultIsChecked>
                Checkbox
              </Checkbox>
              <Checkbox colorScheme="brand" defaultIsChecked>
                Checkbox
              </Checkbox>
            </Stack>
            <Button>Submit</Button>
          </Flex>
        </Box>
      </Stack>
    </Layout>
  )
}

export default withAdminAuth(AddSlot, [
  policy['interviewer'],
  policy['acInterviewer'],
])
