import { Card, Layout, StatusCard } from '../../components'
import { Breadcrumbs } from './../../components/BreadCrumbs/BreadCrumbs'
import withAuth from '../../context/WithAuth'
import { SEO } from '../../components/Layout/SEO'
import { Stack } from '@chakra-ui/layout'
import { interviewDashBoardData } from '../../data/interview/dashboardData'

function Interview(): JSX.Element {
  const breadcrumbsLinks = [
    { breadcrumbName: 'Dashboard', breadcrumbLink: '/dashboard' },
    {
      breadcrumbName: 'Interview',
      breadcrumbLink: '/interview',
    },
  ]
  return (
    <Layout title="Interview">
      <Stack spacing={6}>
        <Breadcrumbs breadcrumbProp={breadcrumbsLinks} />
        <StatusCard
          prefix={'Interviews taken: 28'}
          bgColor={'black.800'}
          submissionNo={'1'}
          subTitle={'Hope you are enjoying the process!'}
        />
        <Stack>
          {interviewDashBoardData.map((cardItem) => {
            return <Card key={cardItem.id} lockIcon {...cardItem} />
          })}
        </Stack>
      </Stack>
    </Layout>
  )
}

export default withAuth(Interview)
