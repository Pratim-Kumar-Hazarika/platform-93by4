import { model, Model, ObjectId, Schema } from 'mongoose'

export interface PrevSlot {
  from: string
  to: string
}

export interface Slot extends PrevSlot {
  prevSlots: Array<PrevSlot>
  allottedTo: {
    type: ObjectId
    ref: 'User'
  }
  interviewer: {
    type: ObjectId
    ref: 'Interviewer'
  }
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
    allottedTo: {
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

shotSchema.virtual('totalSlots').get(function (this: Slot) {
  return this.prevSlots.length + 1
})

export const Slot = model<Slot, Model<Slot>>('Slot', shotSchema)
