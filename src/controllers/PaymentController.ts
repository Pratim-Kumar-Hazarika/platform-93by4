import { RequestHandler } from 'express'
import { AuthRequest } from '../types/RequestWithUser'
import { nanoid } from 'nanoid'
import { razorpayInstance, RAZORPAY_KEY_SECRET } from '../app'
import crypto from 'crypto'
import { Payment } from '../models/Payment'

export const createPayment: RequestHandler = async (req: AuthRequest, res) => {
  const amount = req?.body?.amount || 0
  const currency = req?.body?.currency || 'INR'
  const options = {
    amount: amount * 100,
    currency,
    receipt: nanoid(),
  }
  try {
    const response = await razorpayInstance.orders.create(options)
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      message: 'Payment order created sucessfully..',
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error while creating order...' })
  }
}

export const recordPayment: RequestHandler = async (req: AuthRequest, res) => {
  try {
    const { paymentId, orderId, description, status } = req.body
    const user = req.user
    if (!user) return res.status(401).json({ message: 'Unauthenticated user' })
    // try {
    //   const paymentRes = await razorpayInstance.payments.fetch(paymentId)
    //   const orderRes = await razorpayInstance.orders.fetch(orderId)
    // } catch (err) {
    //   console.log(err)
    // }
    const newPayment = new Payment({
      paymentId,
      orderId,
      type: description || '',
      status: status,
      user: user?._id,
    })
    newPayment.save()
    return res.status(200).json({ message: 'Payment recorded successfully' })
  } catch {
    return res
      .status(500)
      .json({ message: 'Error while saving the payment details' })
  }
}

export const verifySignature: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  try {
    const { orderCreationId, razorpayPaymentId, razorpaySignature } = req.body

    const user = req.user

    if (!user) return res.status(401).json({ message: 'Unauthorized' })

    const signature = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET || '')
    signature.update(`${orderCreationId}|${razorpayPaymentId}`)
    const generatedSignature = signature.digest('hex')
    if (generatedSignature === razorpaySignature) {
      // const options = {
      //   amount: 0,
      //   currency: 'INR',
      //   receipt: nanoid(),
      //   payment_capture: 1,
      // }
      // const response = await razorpayInstance.payments.fetch(
      //   razorpayPaymentId,
      //   options
      // )
      res.status(200).json({
        message: 'Payment verified successfully',
      })
    } else {
      return res.status(500).json({ message: 'Transaction is not legit' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error while verifying signature...' })
  }
}
