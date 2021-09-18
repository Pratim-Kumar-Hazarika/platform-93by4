import { model, Model, ObjectId, Schema } from 'mongoose'

export type SlotStatus = 'open' | 'closed'
export interface Slot {
  from: string
  to: string
  status: SlotStatus
  interviewee?: any
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
