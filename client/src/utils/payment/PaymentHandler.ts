import {
  PaymentHandlerArguments,
  VerifySignature,
} from '../../context/PaymentContext/PaymentContext.types'
import { recordPayment, verifyPayment } from '../../services/axiosService'

export const paymentHandler = async ({
  setLoading,
  description,
  status,
  response,
}: PaymentHandlerArguments) => {
  console.log('paymentHandler', status, response)
  try {
    const data: VerifySignature = {
      orderCreationId: response?.razorpay_order_id,
      razorpayPaymentId: response?.razorpay_payment_id,
      razorpaySignature: response?.razorpay_signature,
    }
    let verifySignature: any
    try {
      verifySignature = await verifyPayment(data)
    } catch (err) {
      console.log('error', err)
    }

    try {
      console.log('verifySignature', verifySignature)
      const savePaymentDetails = await recordPayment({
        paymentId: response?.razorpay_payment_id,
        orderId: response?.razorpay_order_id,
        description,
        status: (verifySignature || {})?.status === 200 ? 'success' : 'failure',
      })
      setLoading && setLoading(false)
      return (
        savePaymentDetails?.status === 200 &&
        (verifySignature || {})?.status === 200
      )
    } catch (error) {
      console.log('error', error)
      return false
    }
  } catch (error) {
    return error
  }
}
