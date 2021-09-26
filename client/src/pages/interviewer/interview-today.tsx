import { Box, Heading, Stack, Text } from '@chakra-ui/layout'
import { Breadcrumbs, Layout } from '../../components'
import { InterviewSlot } from '../../components/InterviewSlot/InterviewSlot'
import withAdminAuth from '../../context/WithAdminAuth'
import withAuth from '../../context/WithAuth'
import { getTimeFromLocalString } from '../../utils/getTimeFromLocalString'
import { policy } from '../../utils/policy'

function InterviewToday() {
  const breadcrumbsLinks = [
    { breadcrumbName: 'Dashboard', breadcrumbLink: '/dashboard' },
    {
      breadcrumbName: "Today's Interview",
      breadcrumbLink: '/interview-today',
    },
  ]
  console.log(getTimeFromLocalString('10/9/2021, 12:00:51 pm'))
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
          <InterviewSlot />
        </Box>
      </Stack>
    </Layout>
  )
}

export default withAdminAuth(InterviewToday, [policy['interviewer']])
