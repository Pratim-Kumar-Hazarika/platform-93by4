import { model, Model, ObjectId, Schema } from 'mongoose'

export type SlotStatus = 'open' | 'closed' | 'booked'
export interface Slot {
  from: string
  to: string
  status: SlotStatus
  link: string
  interviewee: any
  interviewer: any
}

const shotSchema = new Schema<Slot, Model<Slot>, Slot>(
  {
    from: {
      type: String,
      required: [true, 'From time is required'],
    },
    to: {
      type: String,
      required: [true, 'To time is required'],
    },
    status: {
      type: String,
      enum: ['open', 'closed', 'booked'],
      default: 'open',
      required: [true, 'Status is required'],
    },
    link: {
      type: String,
    },
    interviewee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    interviewer: {
      type: Schema.Types.ObjectId,
      ref: 'Interviewer',
      required: [true, 'Interviewer is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const Slot = model<Slot, Model<Slot>>('Slot', shotSchema)
