import { Box, Heading, Stack, Text } from '@chakra-ui/layout'
import { Breadcrumbs, Layout } from '../../components'
import { InterviewSlot } from '../../components/InterviewSlot/InterviewSlot'
import useInterviewerDetails from '../../context/InterviewerContext'
import withAdminAuth from '../../context/WithAdminAuth'
import { policy } from '../../utils/policy'
import { isToday } from '../../utils/isDateToday'

function InterviewToday() {
  const breadcrumbsLinks = [
    { breadcrumbName: 'Dashboard', breadcrumbLink: '/dashboard' },
    {
      breadcrumbName: "Today's Interview",
      breadcrumbLink: '/interview-today',
    },
  ]

  const { interviewerState, interviewerDispatch } = useInterviewerDetails()

  const todaysSlot = () => {
    return interviewerState.slots.filter((slot) => {
      return isToday(new Date(slot.from)) && slot.interviewee
    })
  }

  return (
    <Layout title="Add Slots">
      <Stack spacing={4}>
        <Breadcrumbs breadcrumbProp={breadcrumbsLinks} />
        <Heading pt="0.5rem" color="brand.500">
          Your Interview Today
        </Heading>
        <Text pb="2rem">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quae
          odit assumenda dolorum laboriosam reprehenderit, officia harum vitae
          nobis in
        </Text>
        <Box>
          <InterviewSlot slots={todaysSlot()} />
        </Box>
      </Stack>
    </Layout>
  )
}

export default withAdminAuth(InterviewToday, [policy['interviewer']])
