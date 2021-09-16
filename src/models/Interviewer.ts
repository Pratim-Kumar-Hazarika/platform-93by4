import { ObjectId } from 'mongoose'
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
  role: Policy['interviewer']
  /** This is array of userID */
  reviewHistory: Array<{
    portfolioUrl: string
    date: Date
  }>
}
