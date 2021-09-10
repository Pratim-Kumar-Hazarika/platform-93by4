import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  Center,
  Spinner,
  Alert,
  Flex,
  Icon,
} from '@chakra-ui/react'
import { FiExternalLink, FiAlertOctagon } from 'react-icons/fi'
import { BiMailSend } from 'react-icons/bi'

import { Footer } from '../components/Footer/Footer'
import NextLink from 'next/link'
import { useAuth } from '../context/AuthContext'
import router from 'next/router'
import LandingIllustration from '../components/Illustrations/LandingIllustration'
import { theme } from '../themes'
import Head from 'next/head'
import { Navbar } from './../components/Navbar/Navbar'

export default function Home() {
  const { authState } = useAuth()

  if (authState?.isAuthenticated) {
    router.push('/dashboard')
    return (
      <Center minH="100vh">
        <Spinner />
      </Center>
    )
  }

  return (
    <Flex
      background={theme.colors.black['900']}
      height={`100vh`}
      margin={'auto'}
      flexDirection={'column'}
      alignItems={'center'}
      overflowX={'hidden'}
      overflowY={'auto'}
    >
      <Head>
        <title>NeoG Camp Admission Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Box maxWidth={'1000px'} width={'100%'} padding={['1rem', '2rem']}>
        <Alert status="warning">
          <Icon as={FiAlertOctagon} w={6} h={6} color={'#f5a51b'} />
          <Text ml={'1rem'} color={'#f5a51b'}>
            The first deadline for admissions is{' '}
            <Text as={'u'} fontWeight={'bold'}>
              30th September 2021
            </Text>
            . We might open next slot depending on performance.
          </Text>
        </Alert>
        <Stack
          direction={{ base: 'column-reverse', lg: 'row' }}
          spacing={{ base: '3rem', lg: '4rem' }}
          align={{ lg: 'center' }}
          justify="space-between"
          marginTop={'1rem'}
        >
          <Box flex="1" maxW={{ lg: '520px' }}>
            <Heading
              as="h1"
              size="3xl"
              color={'white'}
              fontWeight="extrabold"
              letterSpacing="tighter"
            >
              Your learning journey starts here.
            </Heading>
            <Text color={'gray.400'} mt="4" fontSize="lg" fontWeight="medium">
              Signup to start your admission process for neoG Camp (levelOne)
            </Text>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing="4"
              mt={{ base: '12', md: '8' }}
            >
              <NextLink href="/auth/signup">
                <Button
                  size="lg"
                  minW="210px"
                  colorScheme="brand.500"
                  height="14"
                  px="8"
                  color="black.900"
                >
                  Signup
                </Button>
              </NextLink>
              <NextLink href="/auth/login">
                <Button
                  size="lg"
                  bg="black.900"
                  color="brand.500"
                  _hover={{ bg: 'black.800' }}
                  height="14"
                  px="8"
                  shadow="base"
                  border="2px"
                  borderColor="brand.500"
                >
                  Login
                </Button>
              </NextLink>
            </Stack>
            <a
              href="https://neog.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="link"
                color="brand.400"
                rightIcon={<BiMailSend fontSize="xl" />}
                size="md"
                mt={{ base: '12', md: '8' }}
              >
                Know regularly what's cooking in the camp
              </Button>
            </a>
            <a
              href="https://neog.camp/level-one"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="link"
                color="gray.400"
                rightIcon={<FiExternalLink fontSize="xl" />}
                size="md"
                mt={{ base: '4', md: '4' }}
              >
                Know more about the camp
              </Button>
            </a>
            <Footer />
          </Box>
          <Box
            pos="relative"
            w={{ base: 'full', lg: '500px' }}
            h={{ base: 'auto', lg: '500px' }}
            px={4}
          >
            <LandingIllustration />
          </Box>
        </Stack>
      </Box>
    </Flex>
  )
}
