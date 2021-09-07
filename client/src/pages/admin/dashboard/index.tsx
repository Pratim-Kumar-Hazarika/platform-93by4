import { Box, Flex, Heading, Stack, Text, useToast } from '@chakra-ui/react'
import { Layout, List } from '../../../components'
import { theme } from '../../../themes'
import { FiExternalLink } from 'react-icons/fi'
import { BiBookBookmark, BiFileFind } from 'react-icons/bi'
import { HiArrowCircleRight } from 'react-icons/hi'
import { useAdminAuth } from '../../../context/AdminContext'
import { requestPortfolio } from '../../../services/axiosService'
import withAdminAuth from '../../../context/WithAdminAuth'
import router from 'next/router'
import { ReviewerHistory } from '../../../components/Review/ReviewerHistory'

function Dashboard() {
  const toast = useToast()
  const { authState, setAuthState } = useAdminAuth()

  async function handleReviewRequest() {
    const response = await requestPortfolio()

    if (response.data.code === 'ALREADY_ASSIGNED') {
      toast({
        title: 'You have a portfolio assigned that is pending a review',
        description:
          'Please finish existing review before you can request another one.',
      })
      router.push('/admin/review-portfolios')
    }

    if (response.data.code === 'NO_PORTFOLIO_LEFT') {
      toast({
        title: 'There are no portfolios currently that require review.',
        description: 'Check back later!',
      })
    }

    if (response.data.code === 'PORTFOLIO_ASSIGNED') {
      const { portfolioAssigned, portfolioReviewed, reviewHistory } =
        response.data.reviewerInfo
      setAuthState((prevState) => {
        return {
          ...prevState,
          admin: {
            portfolioAssigned,
            portfolioReviewed,
            reviewHistory,
          },
        }
      })
      router.push('/admin/review-portfolios')
    }
  }

  return (
    <>
      <Layout>
        <Flex
          bg={theme.colors.black['800']}
          align="center"
          justify="space-between"
          px="6"
          py="8"
          rounded="sm"
        >
          <Stack direction={'column'} spacing={3}>
            <Heading fontSize="2xl">
              Portfolios Reviewed: {authState?.admin?.portfolioReviewed}
            </Heading>
            <Text fontSize="md">
              Welcome, {authState?.admin?.firstName}! You can checkout portfolio
              review guidelines or request a new portfolio for review. We hope
              you are enjoying this process!
            </Text>
          </Stack>
        </Flex>

        <Stack spacing="6" py="5">
          <List
            icon={<BiBookBookmark />}
            title="Checkout reviewer guidelines."
            linkIcon={<FiExternalLink size="1.5rem" />}
            link="https://tanvi-neogcamp.notion.site/neoG-Reviewer-s-Guide-538ac4e94d934473be2d7695e4bb65a6"
          >
            Go through this guide to learn more about reviewing a portfolio,
            marks distribution and things to look for.
          </List>

          <List
            icon={<BiFileFind />}
            title="Review a portfolio."
            linkIcon={<HiArrowCircleRight size="2rem" />}
            action="Request portfolio"
            onClick={handleReviewRequest}
          >
            Request a new portfolio for review.
          </List>
        </Stack>
        <Box>
          <Heading fontSize="2xl">Previous Reviews</Heading>
          <ReviewerHistory />
        </Box>
      </Layout>
    </>
  )
}

export default withAdminAuth(Dashboard)
