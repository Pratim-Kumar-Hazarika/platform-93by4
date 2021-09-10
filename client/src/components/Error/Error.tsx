import { Flex, Box, Heading, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'

export function Error({ path, message }: { path?: string; message?: string }) {
  return (
    <Flex
      backgroundColor="blackAlpha.900"
      align="center"
      justify={{ base: 'center' }}
      direction={{ base: 'column', md: 'column', sm: 'column' }}
      minH="100vh"
    >
      <Box padding="2rem">
        <Image src={path || '/svgs/notFound.svg'} alt={`user-pic`} />
      </Box>

      <Box margin={'2rem'}>
        <Heading as="h3" size="lg" color="whiteAlpha.900">
          {message || 'Oops! The page you’re trying to reach doesn’t exist.'}
        </Heading>

        <Link href="/">
          <Text color="blue.300" textDecoration="underline" cursor="pointer">
            Click here to go back home
          </Text>
        </Link>
      </Box>
    </Flex>
  )
}
