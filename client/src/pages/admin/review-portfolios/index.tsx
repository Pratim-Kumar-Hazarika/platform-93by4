import React from 'react'
import {
  Box,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Link,
  Button,
} from '@chakra-ui/react'

import { theme } from '../../../themes'
import { Breadcrumbs, Layout } from '../../../components'
import { useAdminAuth } from '../../../context/AdminContext'
import { MarkPanel } from '../../../components/Review/MarkPanel'
import { PortfolioPanel } from '../../../components/Review/PortfolioPanel'
import { NeedsRevisionPanel } from '../../../components/Review/NeedsRevisionPanel'
import withAdminAuth from '../../../context/WithAdminAuth'

const breadcrumbLinks = [
  {
    breadcrumbName: 'Dashboard',
    breadcrumbLink: '/dashboard',
  },
  {
    breadcrumbName: 'Review Portfolios',
    breadcrumbLink: '/admin/review-portfolios/',
  },
]

function ReviewerPortfolios() {
  const { authState } = useAdminAuth()

  const portfolio = authState?.admin?.portfolioAssigned

  return (
    <Layout>
      <Box>
        <Breadcrumbs breadcrumbProp={breadcrumbLinks} />
        <Stack spacing={4} direction={['column']}>
          <Heading mt="4">Review portfolio</Heading>
          <Text>
            Please click on the portfolio link and check if the student has
            submitted a complete and personal portfolio or not.{' '}
            <Link
              isExternal
              href="https://tanvi-neogcamp.notion.site/neoG-Reviewer-s-Guide-538ac4e94d934473be2d7695e4bb65a6"
            >
              Here
            </Link>{' '}
            is the mark15 checklist for you to do an awesome review.
          </Text>
        </Stack>
        <Box></Box>
        <Box bg={theme.colors.black['800']} mt={5} rounded={'sm'}>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Portfolio</Tab>
              {portfolio && (
                <>
                  <Tab>Needs Revision</Tab>
                  <Tab>mark15 Ready</Tab>
                </>
              )}
            </TabList>
            <TabPanels>
              <TabPanel>
                {portfolio ? (
                  <PortfolioPanel
                    name={portfolio.user.firstName}
                    portfolioLink={portfolio.portfolioUrl}
                    resubmissions={portfolio.resubmissionCount}
                    reviewComments={portfolio.reviewComments ?? []}
                  />
                ) : (
                  <Box
                    bg={theme.colors.black['700']}
                    px={{ base: 4, sm: 6 }}
                    py="5"
                    border="1px"
                    borderColor={theme.colors.black['600']}
                    borderRadius="md"
                  >
                    <Text>
                      You are not assigned any portfolio that needs review.
                      Please Use the request portfolio for review option from
                      reviewer dashboard.
                    </Text>
                    <Box mt={4}>
                      <Link href="/admin/dashboard">
                        <Button>Go Back</Button>
                      </Link>
                    </Box>
                  </Box>
                )}
              </TabPanel>
              <TabPanel>
                {portfolio && (
                  <NeedsRevisionPanel portfolioId={portfolio._id} />
                )}
              </TabPanel>
              <TabPanel>
                {portfolio && <MarkPanel portfolioId={portfolio._id} />}
              </TabPanel>{' '}
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Layout>
  )
}

export default withAdminAuth(ReviewerPortfolios)
