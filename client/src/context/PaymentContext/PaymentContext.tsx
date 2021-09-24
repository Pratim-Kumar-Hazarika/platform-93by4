/* eslint-disable no-undef */
import axios, { AxiosError } from 'axios'
import { createContext, ReactNode, useContext, useState } from 'react'
import {
  HandlerResponse,
  ServerError,
  PaymentContextValue,
} from './PaymentContext.types'
import { useRouter } from 'next/router'
import { loadScript } from '../../utils/payment/loadScript'
import { theme } from '../../themes'
import { useAuth } from '../AuthContext'
import { makePayment } from '../../services/axiosService'
import { paymentHandler } from '../../utils/payment/PaymentHandler'
import { useToast } from '@chakra-ui/toast'

const PaymentContext = createContext<PaymentContextValue>(
  {} as PaymentContextValue
)

export const PaymentDetailsProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { authState } = useAuth()
  const toast = useToast()
  async function openRazorpay(
    amount: number,
    currency?: string,
    type?: string,
    updateOptions?: any
  ) {
    setLoading(true)
    try {
      const scriptResponse = await loadScript(
        'https://checkout.razorpay.com/v1/checkout.js'
      )
      if (!scriptResponse) {
        return false
      }

      const orderResponse = await makePayment({
        amount: amount,
        state: authState?.user?.state || '',
        currency: currency || 'INR',
      })
      if (orderResponse.status === 200) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
          amount: orderResponse.data.amount,
          currency: orderResponse.data.currency,
          name: 'NEOG',
          description: 'Payment for interview',
          order_id: orderResponse.data.id,
          image: `https://raw.githubusercontent.com/neogcamp/platform-93by4/main/client/public/android-chrome-512x512.png`,
          handler: async function (response: HandlerResponse) {
            const paymentHandlerArguments = {
              response,
              description: type || '',
              status: 'success',
              setLoading,
            }
            const payRes = await paymentHandler(paymentHandlerArguments)
            console.log(payRes)
            if (payRes) {
              toast({
                title: 'Payment Successful',
                description: 'Thank you for your payment',
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
            } else {
              toast({
                title: 'Payment Failed',
                description: 'Please try again',
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
            }
          },
          prefill: {
            name: `${authState?.user?.firstName} ${authState?.user?.lastName}`,
            email: authState?.user?.email || '',
            contact: authState?.user?.phone || '',
          },
          modal: {
            ondismiss: function () {
              setLoading(false)
              console.log('dismissed')
            },
          },
          theme: {
            color: theme.colors.brand['600'],
          },
          timeout: 200,
          ...(updateOptions || {}),
        }

        const _window = window as any
        const paymentObject = new _window.Razorpay(options)
        paymentObject.open()
        paymentObject.on('payment.failed', async function (response: any) {
          console.log('Payment failed', response)
          const payRes = await paymentHandler({
            setLoading,
            description: type || '',
            status: 'failed',
            response: {
              razorpay_order_id: response?.error?.metadata?.order_id,
              razorpay_payment_id: response?.error?.metadata?.payment_id,
              razorpay_signature: '',
            },
          })
          if (!payRes) {
            toast({
              title: 'Payment Failed',
              description: 'Please try again',
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
          }
        })
      }
      // paymentObject.on('payment.failed', async function (response: any) {
      //   failedPaymentHandler(response, authState?.user?.email || '', setLoading)
      // })
    } catch (error) {
      setLoading(false)
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>
        if (serverError && serverError.response) {
          return serverError.response.data
        }
      }
      return { errorMessage: 'Something went wrong' }
    }
  }
  return (
    <PaymentContext.Provider value={{ openRazorpay }}>
      {children}
    </PaymentContext.Provider>
  )
}

export function usePayment(): PaymentContextValue {
  const context = useContext(PaymentContext)
  if (!context) {
    throw new Error('PaymentContext is not available!')
  }
  return context
}
