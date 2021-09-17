import { useState, useEffect } from 'react'
import { Text, Flex, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import { Layout, StatusCard, StepCard } from '../../components'
import {
  data,
  StatusType,
  step,
  submissionSting,
} from '../../data/staticData/admissionStages'
import { theme } from '../../themes'
import { getDashboard, logout } from '../../services/axiosService'

import withAuth from '../../context/WithAuth'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
import { SEO } from '../../components/Layout/SEO'
import { number } from 'yup/lib/locale'
import { StepCardInterview } from '../../components/StepCard/StepCardInteview'
import { StepCardPayment } from '../../components/StepCard/StepcardPayment'

function Dashboard() {
  const [currentStatus, setCurrentStatus] = useState('portfolio_not_submitted')
  const [submissionNo, setSubmissionNo] = useState(null)
  const [resubmissionNo, setResubmissionNo] = useState(null)
  const toast = useToast()
  const router = useRouter()
  const { setAuthState } = useAuth()
  useEffect(() => {
    async function fetch() {
      await getDashboard()
        .then((user) => {
          const portfolio = user.foundPortfolio.portfolioUrl
          portfolio !== undefined &&
            (setCurrentStatus(portfolio.status),
            setSubmissionNo(portfolio.submissionNo),
            setResubmissionNo(portfolio.resubmissionCount))
          if (portfolio !== undefined) {
            console.log(portfolio)
            portfolio.resubmissionCount >= 3 &&
              portfolio.status == 'portfolio_needs_revision' &&
              setCurrentStatus('portfolio_revision_exceeded'),
              console.log(portfolio.submissionNo, portfolio.status)
          }
        })
        .catch((err) => {
          // this is in case error happens, we would want their token to be removed
          // so they can log in again.
          console.log(err)
          localStorage.removeItem('x-auth-token')
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
            user: null,
          })
          router.push('/')
          toast({
            title: 'Something went wrong.',
            description: 'Please try again.',
          })
        })
    }
    fetch()
  }, [])

  const status = data.find((e) => e.status == currentStatus)
  const [cardLink, setCardLink] = useState<string | undefined>(undefined)

  useEffect(() => {
    switch (status?.status) {
      case 'portfolio_not_submitted':
        setCardLink('/submission/questions')
        break
      case 'portfolio_needs_revision':
        setCardLink('/resubmission')
        break
      case 'portfolio_under_review':
      case 'getting_reviewed':
      case 'portfolio_passed':
      default:
        setCardLink(undefined)
    }
  }, [status])
  return (
    <Layout>
      <SEO title="Dashboard" />
      <Flex as="section" flexDir="column">
        {cardLink == undefined ? (
          <StatusCard
            status={status}
            bgColor={theme.colors.black['800']}
            submissionNo={submissionNo}
            prefix={'Current Status:'}
          />
        ) : (
          <Link href={cardLink}>
            <StatusCard
              status={status}
              bgColor={theme.colors.black['800']}
              submissionNo={submissionNo}
              prefix={'Current Status:'}
            />
          </Link>
        )}
        <Text
          my={8}
          color={theme.colors.gray['100']}
          fontWeight="bold"
          fontSize={['md', 'md', 'xl']}
        >
          {submissionSting}
        </Text>

        <Flex flexDir="column">
          <StepCard
            bgColor={theme.colors.black['800']}
            step={step.portfolio}
            status={status as StatusType}
            submissionNo={submissionNo}
            index={1}
          />
          <StepCardInterview
            bgColor={theme.colors.black['800']}
            step={step.interview}
            status={status as StatusType}
            submissionNo={submissionNo}
            index={2}
          />
          <StepCardPayment
            bgColor={theme.colors.black['800']}
            step={step.payment}
            status={status as StatusType}
            submissionNo={submissionNo}
            index={3}
          />
        </Flex>
      </Flex>
    </Layout>
  )
}
export default withAuth(Dashboard)
