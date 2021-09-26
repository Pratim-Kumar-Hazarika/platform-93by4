import { Box, Heading, Stack, Text } from '@chakra-ui/layout'
import { Breadcrumbs, Calendar, Layout, SlotList } from '../../components'
import { InterviewSlot } from '../../components/InterviewSlot/InterviewSlot'
import useInterviewerDetails from '../../context/InterviewerContext'
import withAdminAuth from '../../context/WithAdminAuth'
import { policy } from '../../utils/policy'
import { isToday } from '../../utils/isDateToday'
import { Flex } from '@chakra-ui/core'

function InterviewToday() {
  const breadcrumbsLinks = [
    { breadcrumbName: 'Dashboard', breadcrumbLink: '/interviewer' },
    {
      breadcrumbName: 'Montly Calendar',
      breadcrumbLink: '/montly-calendar',
    },
  ]

  const { interviewerState, interviewerDispatch } = useInterviewerDetails()

  //   const todaysSlot = () => {
  //     return interviewerState.slots.filter((slot) => {
  //       return isToday(new Date(slot.from)) && slot.interviewee
  //     })
  //   }

  const currentDate = () => {
    console.log('Hello')
  }

  return (
    <Layout title="Add Slots">
      <Stack spacing={4}>
        <Breadcrumbs breadcrumbProp={breadcrumbsLinks} />
        <Heading pt="0.5rem" color="brand.500">
          Your Montly Calendar
        </Heading>
        <Text pb="2rem">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quae
          odit assumenda dolorum laboriosam reprehenderit, officia harum vitae
          nobis in
        </Text>
        <Flex w="full" bg="black.800" p="2rem 2rem" rounded="lg">
          <Calendar currentDateHandler={currentDate} />
          <SlotList
            interviewSlots={[]}
            title="Pick Slot"
            key={`pick-slot-list-1`}
            // slotClickHandler={soltId: string) => Promise<void>}
            addTimeInputVisibility={false}
            deleteButton={false}
          />
        </Flex>
      </Stack>
    </Layout>
  )
}

export default withAdminAuth(InterviewToday, [policy['interviewer']])
