import { Box, Button, Heading, Text, Link, Flex } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Tweets } from '../../data/staticData/differentTweets'

type userStatusProps = {
  submissionNo?: string
  status?: string
}
export function CongratsCard({
  submissionNo,
  status,
}: userStatusProps): JSX.Element {

  const tweet = Tweets[Math.floor(Math.random() * Tweets.length)]
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      colorscheme="black.200"
      m="10"
      p="10"
      background="black.800"
      border="none"
    >
      <Heading as="h1" size="lg" color="#00F0FF" fontFamily="Inter">
        Yay! Portfolio is successfully{' '}
        {status !== 'portfolio_needs_revision' ? 'submitted' : 'resubmission'}! 🎉
      </Heading>
      <Text fontSize="14px" fontStyle="bold" pt="2" pb="2" color="white">
        Submission Number: #{submissionNo}
      </Text>

      <Text fontSize="14px" fontStyle="bold" color="white">
        Current Status:{' '}
        {status!
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}
      </Text>
      <Flex
        pt="5"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Heading fontSize="md" p={{ base: '3', md: '0' }}>
          <Link
            href={"https://twitter.com/intent/tweet?text="+ tweet}
            isExternal
            color="cyan"
          >
            Tweet this out!
          </Link>
        </Heading>
        <NextLink href="/dashboard">
          <Button colorscheme="brand" color="black">
            Go back to Dashboard
          </Button>
        </NextLink>
      </Flex>
    </Box>
  )
}
