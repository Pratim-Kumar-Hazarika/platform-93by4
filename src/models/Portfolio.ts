import { IUser } from './User'
import { Schema, model, Model, ObjectId, Date } from 'mongoose'

type Status =
  | 'portfolio_not_submitted'
  | 'under_review'
  | 'portfolio_needs_revision'
  | 'portfolio_revision_exceeded'
  | 'portfolio_passed_interview_to_be_scheduled'

export interface IPortfolioUrl {
  /** Current submission number for the portfolio, number*/
  submissionNo: number
  /** This array stores the previous numbers of the submitted portfolio, Array<number>*/
  previousSubmissions?: Array<{
    number: number
    url: string
    date: Date
  }>
  /** This stores the times the portfolio has been resubmitted, number*/
  resubmissionCount?: number
  /** This stores the current URL of the portfolio*/
  portfolioUrl: string
  /** This stores the current status of the portfolio */
  status: Status
  reviewComments?: Array<{
    author: string
    comment: string
    date: Date
  }>
  portfolioMarks?: {
    projects: number
    blogs: number
    effort: number
    linkedin: number
  }
  // TODO: Come up with better type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
}

const PortfolioSchema = new Schema<
  IPortfolioUrl,
  Model<IPortfolioUrl>,
  IPortfolioUrl
>(
  {
    submissionNo: Number,
    previousSubmissions: [
      {
        number: Number,
        url: String,
        date: Schema.Types.Date,
      },
    ],
    resubmissionCount: Number,
    portfolioUrl: {
      type: String,
      unique: true,
    },
    status: String,
    reviewComments: [
      {
        author: String,
        comment: String,
        date: Schema.Types.Date,
      },
    ],
    portfolioMarks: {
      projects: Number,
      blogs: Number,
      effort: Number,
      linkedin: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

export const PortfolioUrl = model<IPortfolioUrl>(
  'PortfolioUrl',
  PortfolioSchema
)
