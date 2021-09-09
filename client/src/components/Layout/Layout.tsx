import { Flex, Box } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Head from 'next/head'
import { Navbar } from '../'
import { theme } from '../../themes'
import { useEffect, useRef } from 'react'

export function Layout({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
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
  return (
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
        <title>NeoG Camp Admission Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Box
        maxWidth={'1000px'}
        width={'100%'}
        padding={['1rem', '2rem']}
        marginTop={'1rem'}
      >
        {children}
      </Box>
    </Flex>
  )
}
