import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { theme } from './../themes/index'
import { AuthProvider } from '../context/AuthContext'
import { AdminAuthProvider } from '../context/AdminContext'
import { InterviewerDetailsProvider } from '../context/InterviewerContext'
import { PaymentDetailsProvider } from '../context/PaymentContext/PaymentContext'
import { IntervieweeDetailsProvider } from '../context/IntervieweeContext'

declare global {
  interface Window {
    gapi: any
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   ;(async () => {
  //     const res = await loadScript('https://apis.google.com/js/api.js')
  //     console.log({ res })
  //     if (res) {
  //       window.gapi = window.gapi
  //       console.log(22, window.gapi)
  //     }
  //     // window.gapi.load('client:auth2', () => {
  //     //   console.log('loaded client')
  //     //   window.gapi.client.init({
  //     //     apiKey: process.env.API_KEY,
  //     //     clientId: process.env.CLIENT_ID,
  //     //     discoveryDocs: process.env.DISCOVERY_DOCS,
  //     //     scope: process.env.SCOPES,
  //     //   })
  //     // })
  //   })()
  // }, [])

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
