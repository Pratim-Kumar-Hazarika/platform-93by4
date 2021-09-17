import React from 'react'
import { Flex, Box, Heading, chakra } from '@chakra-ui/react'
import { LockIcon, ExternalLinkSvg } from '..'
import { theme } from '../../themes'
import Link from 'next/link'
import { StepType, StatusType } from '../../data/staticData/admissionStages'
import { HiArrowCircleRight } from 'react-icons/hi'

type StepcardProps = {
  bgColor: string
  step: StepType
  status: StatusType
  index: number
  submissionNo: number | null
}

export function StepCardInterview({
  bgColor,
  step,
  status,
  index,
  submissionNo,
}: StepcardProps) {
  let interviewSubmissionstatus = ''
  if (status.level == step.level) {
    interviewSubmissionstatus = 'Not Started'
    if (status.status == 'admission_form_incomplete') {
      interviewSubmissionstatus = 'Not Started'
    } else if (status.status == 'admission_form_under_review') {
      interviewSubmissionstatus = 'In Progress'
    } else {
      interviewSubmissionstatus = 'Completed'
    }
  }
  return (
    <Flex
      flexDir={'row'}
      alignItems="center"
      justifyContent="space-between"
      bgColor={bgColor}
      borderRadius={9.5}
      px={[6, 8, 8]}
      py={[4, 6, 6]}
      mb={[2, 3, 3]}
    >
      <Box m={2}>
        <LockIcon index={index} locked={status.level < step.level} />
      </Box>

      <Heading
        as="h3"
        fontSize={['sm', 'md', 'lg']}
        flex="auto"
        color={theme.colors.gray['100']}
        width="100%"
        d="flex"
        flexDirection={['column', 'inherit']}
      >
        {step.content}{' '}
        <chakra.span
          color={theme.colors.black[500]}
          paddingLeft={['0', '20px']}
        >
          {interviewSubmissionstatus}
        </chakra.span>
      </Heading>
      {console.log(status.level, step.level)}
      {status.level == step.level ? (
        // status.status == 'portfolio_under_review' ||
        status.status == 'admission_form_under_review' ? (
          //locks open but link inaccessable

          <a>{<ExternalLinkSvg color={theme.colors.black['700']} />}</a>
        ) : //lock open , link accessible but redirect to different page
        status.status == 'portfolio_needs_revision' ? (
          <Link href="/resubmission">
            <a>
              {
                <HiArrowCircleRight
                  color={theme.colors.black['100']}
                  style={{ height: '30px', width: '30px' }}
                />
              }
            </a>
          </Link>
        ) : (
          //lock open , link accessible to general page
          <Link href={step.link}>
            <a>
              {
                <HiArrowCircleRight
                  color={theme.colors.black['100']}
                  style={{ height: '30px', width: '30px' }}
                />
              }
            </a>
          </Link>
        )
      ) : (
        <a>
          {
            <HiArrowCircleRight
              color={theme.colors.black['700']}
              style={{ height: '30px', width: '30px' }}
            />
          }
        </a>
      )}
    </Flex>
  )
}
