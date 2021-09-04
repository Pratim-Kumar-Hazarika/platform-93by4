import {
  Flex,
  Input,
  Button,
  Box,
  Heading,
  Text,
  useToast,
  Center,
  Spinner,
} from '@chakra-ui/react'
import React, { useRef, useState, useEffect, MutableRefObject } from 'react'
import axios from 'axios'
import { Layout, Breadcrumbs, Alert } from '../../components'
import { useRouter } from 'next/router'
import { theme } from '../../themes'
import { isUrlValid } from '../../utils/utils'
import { ResubmissionData } from '../../data/strings/submission'
import { useAuth } from '../../context/AuthContext'
import withAuth from '../../context/WithAuth'
import { getDashboard, reSubmissionLink } from '../../services/axiosService'

export interface reSubmissionValues {
  submissionNo: number
  status: string
  portfolioUrl: string
}
export interface reviewComment {
  author: string
  comment: string
  date: Date
}

const ReSubmissionWindow: React.FC = () => {
  const [disableButton, setDisabledButton] = useState<boolean>(true)
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>
  const router = useRouter()
  const toast = useToast()
  const [checkInput, setCheckInput] = useState<string>('')
  const { authState, setAuthState } = useAuth()
  const [reviewComment, setReviewComment] = useState<reviewComment[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  async function handleUserRequest() {
    const response = await getDashboard()
    setReviewComment(response.foundPortfolio?.portfolioUrl?.reviewComments)
    if (
      response.foundPortfolio?.portfolioUrl?.status !==
      'portfolio_needs_revision'
    ) {
      router.push('/dashboard')
    }
  }
  useEffect(() => {
    handleUserRequest()
    setTimeout(() => {
      setIsLoading(false)
    },1500)
  }, [])
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const checkPortfolioUrl = (): void => {
    if (isUrlValid(inputRef.current.value)) {
      setCheckInput('')
      setDisabledButton(false)
    } else {
      setCheckInput('Please enter a valid URL')
      setDisabledButton(true)
    }
  }

  const submitPortfolioUrl = async (): Promise<void> => {
    try {
      const response = await reSubmissionLink({
        submissionNo: 0,
        status: 'portfolio_under_review',
        portfolioUrl: inputRef.current.value,
      })

      if (response.status === 200) {
        toast({
          title: 'Successfully resubmitted!!!',
          description: 'Your portfolio is resubmitted successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        const submissionData = localStorage.setItem(
          'neogSubmission',
          JSON.stringify({
            submissionNo: response.data.submissionNo,
            status: response.data.status,
          })
        )
        setAuthState((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            submissionData: {
              submissionNo: response.data.submissionNo,
              status: response.data.status,
            },
          },
        }))

        router.push('./resubmission/congrats')
      }
      return response.data
    } catch (err: any) {
      if (err.response?.status === 409) {
        toast({
          title: 'Portfolio URL Exists',
          description:
            'The link you have submitted already exists, please try again with your own link!',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Something went wrong',
          description: 'Check your internet connection',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }
  const breadcrumbsLinks = [
    { breadcrumbName: 'Dashboard', breadcrumbLink: '/dashboard' },
    {
      breadcrumbName: 'Submit Portfolio',
      breadcrumbLink: '/submission/questions',
    },
    { breadcrumbName: 'ReSubmission', breadcrumbLink: '/resubmission' },
  ]
  return isLoading ? (
    <Center minH="100vh">
      <Spinner />
    </Center>
  ) : (
    <Layout>
      <Breadcrumbs breadcrumbProp={breadcrumbsLinks} />
      <Flex flexDirection="column" width="auto" pt="2">
        <Heading
          as="h1"
          size="xl"
          color={theme.colors.brand['500']}
          fontFamily="Inter"
          pb="1rem"
        >
          {ResubmissionData.heading}
        </Heading>
        <Text
          color={theme.colors.black['50']}
          fontSize="16px"
          noOfLines={5}
          pb="1rem"
        >
          {ResubmissionData.discription}
        </Text>
      </Flex>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        m={['2rem 0', '2rem']}
        p="2rem"
        background={theme.colors.black['700']}
        border="none"
      >
        <Flex flexDirection="column">
          <Flex>
            <Heading
              as="h2"
              size="md"
              color={theme.colors.brand['500']}
              fontFamily="Inter"
              pb="1rem"
            >
              {ResubmissionData.title}
            </Heading>
          </Flex>
          <Heading
            as="h3"
            size="sm"
            color={theme.colors.black['50']}
            fontFamily="Inter"
            pb="1rem"
          >
            {ResubmissionData.subTitle}
          </Heading>
          <Text color={theme.colors.black['50']} fontSize="16px" pb="1rem">
            {reviewComment[reviewComment.length - 1]?.comment}
          </Text>
          <Flex
            justifyContent={['stretch', 'center']}
            alignItems="center"
            p="5"
            flexDirection={['column', 'row']}
            gap="1rem"
          >
            <Input
              placeholder="https://adarshbalika.netlify.app"
              onChange={checkPortfolioUrl}
              ref={inputRef}
              border="none"
              isInvalid={disableButton}
              errorBorderColor={theme.colors.red['500']}
              background={theme.colors.black['600']}
              width="100%"
              color={theme.colors.black['50']}
              maxWidth="300px"
            />
            <Alert isDisabled={disableButton} onClick={submitPortfolioUrl} />
          </Flex>
          <Flex
            justifyContent={['stretch', 'center']}
            alignItems="center"
            w="100%"
            flexDirection={['column', 'row']}
          >
            <Text
              color={theme.colors.red['500']}
              textAlign="left"
              w="85%"
              maxW="380px"
            >
              {checkInput}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  )
}

export default withAuth(ReSubmissionWindow)
