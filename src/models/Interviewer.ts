import { Schema, model, Model, ObjectId } from 'mongoose'
import bcrypt from 'bcrypt'
import { IPortfolioUrl } from './Portfolio'
import { Policy } from '../utils/policy'

export interface IInterviewer {
  _id: ObjectId
  email: string
  isVerified: boolean
  isAllowedToInterview: boolean
  firstName: string
  lastName: string
  password: string
  passwordResetToken: string | undefined
  passwordResetTokenExpire: Date | undefined
  getPasswordResetToken: () => Promise<string>
  matchPasswords: (password: string) => Promise<boolean>
  interviewed?: number
  interviewAssigned?: IPortfolioUrl
  role: Policy['interviewer']
  /** This is array of userID */
  interviewHistory: Array<{
    portfolioUrl: string
    date: Date
  }>
}

const interviewerSchema = new Schema<IInterviewer, Model<IInterviewer>, IInterviewer>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    isAllowedToInterview: {
      type: Boolean,
      default: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 100,
      select: false,
    },

    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpire: {
      type: Date,
    },
    interviewed: {
      type: Number,
      default: 0,
    },
    interviewAssigned: {
      type: Schema.Types.ObjectId,
      ref: 'PortfolioUrl',
    },
    interviewHistory: [
      {
        portfolioUrl: String,
        date: Date,
      },
    ],
    role: {
      type: Number,
      default: 30,
    },
  },

  {
    timestamps: true,
  }
)

interviewerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

interviewerSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password)
}

export const Interviewer = model<IInterviewer>('Interviewer', interviewerSchema)
