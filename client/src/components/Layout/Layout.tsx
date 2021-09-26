import { Flex, Box, Center, Spinner } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Error, Navbar } from '../'
import { theme } from '../../themes'
import { useEffect, useRef } from 'react'
import featureFlags from '../../../flags.json'

export function Layout({
  children,
  title,
  flag,
  loading,
}: {
  children: ReactNode
  title?: string
  flag?: string
  loading?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  // feature state
  let featureState = true
  if (flag && featureFlags.hasOwnProperty(flag)) {
    featureState = featureFlags[flag as keyof typeof featureFlags]
  }

  // scrolling to top of page
  useEffect(() => {
    console.log('useEffect')
    containerRef?.current &&
      containerRef.current.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
  }, [])

  console.log('Layout', featureFlags)

  return !loading ? (
    <Flex
      ref={containerRef}
      background={theme.colors.black['900']}
      height={`100vh`}
      margin={'auto'}
      flexDirection={'column'}
      alignItems={'center'}
      overflowX={'hidden'}
      overflowY={'auto'}
    >
      <Head>
        <title>{title || 'NeoG Camp Admission Portal'}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <Box
        maxWidth={'1000px'}
        width={'100%'}
        padding={['1rem', '2rem']}
        marginTop={'1rem'}
      >
        {featureState ? children : <Error />}
      </Box>
    </Flex>
  ) : (
    <Center minH="100vh">
      <Spinner />
    </Center>
  )
}
