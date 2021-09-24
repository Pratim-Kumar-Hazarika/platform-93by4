import { Model, model, ObjectId, Schema } from 'mongoose'

export interface IPayment {
  _id: ObjectId
  status: string
  paymentId: string
  orderId: string
  type: string
  user: any
}

const PaymentSchema = new Schema<IPayment, Model<IPayment>, IPayment>(
  {
    status: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const Payment = model<IPayment, Model<IPayment>>(
  'Payment',
  PaymentSchema
)
