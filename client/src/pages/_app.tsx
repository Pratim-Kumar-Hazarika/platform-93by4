import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { theme } from './../themes/index'
import { AuthProvider } from '../context/AuthContext'
import { AdminAuthProvider } from '../context/AdminContext'
import { InterviewerDetailsProvider } from '../context/InterviewerContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <AuthProvider>
        <AdminAuthProvider>
          <InterviewerDetailsProvider>
            <Component {...pageProps} />
          </InterviewerDetailsProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
