import React from 'react'
import { Flex, Heading, Spacer, Text, Image } from '@chakra-ui/react'
import { theme } from '../../themes'
import StatusIllustration from './StatusIllustration'

export function StatusCard({
  status,
  prefix,
  bgColor,
  step,
  submissionNo,
  subTitle,
}: any) {
  return (
    <Flex
      bgColor={bgColor}
      p={8}
      borderRadius={9.5}
      flexDir={['column-reverse', 'column-reverse', 'row']}
    >
      <Flex
        flexDir="column"
        justifyContent="center"
        width={['100%', '100%', '60%']}
      >
        {' '}
        <Heading
          fontSize={['xl', '2xl', '3xl']}
          color={theme.colors.brand['500']}
          textAlign={['center', 'center', 'left']}
        >
          {' '}
          {prefix}{' '}
          <Heading
            fontSize={['xl', '2xl', '3xl']}
            as="span"
            color={status?.color == 'red' ? '#F13C3C' : theme.colors.white}
          >
            {' ' + status?.statusText ? status?.statusText : ' '}
            <br />
          </Heading>
        </Heading>
        <Text
          fontSize="lg"
          status
          fontWeight="500"
          color={theme.colors.white}
          py={2}
          pt={4}
          textAlign={['center', 'center', 'left']}
        >
          {!subTitle ? (
            <>
              {status.statusDescription} <br />
              {submissionNo !== null &&
                status.status == 'portfolio_under_review' &&
                'Submission Number: #' + submissionNo}
            </>
          ) : (
            subTitle
          )}
        </Text>
      </Flex>
      <Spacer />
      <Flex justifyContent="center" margin={['2rem', ' 1rem', '0rem']}>
        <StatusIllustration />
      </Flex>
    </Flex>
  )
}
