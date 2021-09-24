import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { theme } from './../themes/index'
import { AuthProvider } from '../context/AuthContext'
import { AdminAuthProvider } from '../context/AdminContext'
import { InterviewerDetailsProvider } from '../context/InterviewerContext'
import { PaymentDetailsProvider } from '../context/PaymentContext/PaymentContext'
import { IntervieweeDetailsProvider } from '../context/IntervieweeContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <AuthProvider>
        <AdminAuthProvider>
          <InterviewerDetailsProvider>
            <IntervieweeDetailsProvider>
              <PaymentDetailsProvider>
                <Component {...pageProps} />
              </PaymentDetailsProvider>
            </IntervieweeDetailsProvider>
          </InterviewerDetailsProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
