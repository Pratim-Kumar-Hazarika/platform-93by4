import { SignInBody, SignUpBody } from './../validation/AuthValidation'
import { RequestHandler } from 'express'
import { AuthRequest } from './../types/RequestWithUser.d'
import { IReviewer, Reviewer } from '../models/Reviewer'
import { createToken } from '../utils/authUtils'
import { Interviewer } from '../models/Interviewer'
import { policy } from '../utils/policy'
import { User } from '../models/User'

// export const reviewHandler: RequestHandler = async (
//   req: AuthRequest,
//   res: any
// ) => {}

// export const adminInfoHandler: RequestHandler = async (
//   req: AuthRequest,
//   res: any
// ) => {}

/**
 * @description Auth handlers for admins with different roles
 */

export const signInHandler: RequestHandler<unknown, unknown, SignInBody> =
  async (req, res) => {
    const { email, password, as } = req.body

    try {
      if (as === 'reviewer') {
        const reviewerInfo = await Reviewer.findOne({ email })
          .select('+password')
          .populate({
            path: 'portfolioAssigned',
            model: 'PortfolioUrl',
            populate: {
              path: 'user',
              model: 'User',
            },
          })

        if (!reviewerInfo) {
          return res.json({
            msg: 'Incorrect email or password. Please check your credentials.',
            code: 'BAD_CREDENTIALS',
          })
        }

        const validPassword = await reviewerInfo.matchPasswords(password)

        if (!validPassword) {
          return res.json({
            msg: 'Incorrect email or password. Please check your credentials.',
            code: 'BAD_CREDENTIALS',
          })
        }

        const token = createToken({
          role: policy.reviewer,
          _id: reviewerInfo._id,
          email: reviewerInfo.email,
        })

        res.json({
          msg: `Logged in !`,
          token,
          adminInfo: {
            adminId: reviewerInfo._id,
            firstName: reviewerInfo.firstName,
            lastName: reviewerInfo.lastName,
            role: policy.reviewer,
            portfolioAssigned: reviewerInfo.portfolioAssigned ?? null,
            portfolioReviewed: reviewerInfo.portfolioReviewed ?? 0,
            reviewHistory: reviewerInfo.reviewHistory ?? [],
          },
          code: 'LOGGED_IN',
        })
      }
      if (as === 'interviewer') {
        const interviewerInfo = await Interviewer.findOne({ email }).select(
          '+password'
        )

        if (!interviewerInfo) {
          return res.json({
            msg: 'Incorrect email or password. Please check your credentials.',
            code: 'BAD_CREDENTIALS',
          })
        }
        console.log('interviewerInfo', password)
        const validPassword = await interviewerInfo.matchPasswords(password)

        if (!validPassword) {
          return res.json({
            msg: 'Incorrect email or password. Please check your credentials.',
            code: 'BAD_CREDENTIALS',
          })
        }

        const token = createToken({
          role: policy.interviewer,
          _id: interviewerInfo._id,
          email: interviewerInfo.email,
        })

        res.status(200).json({
          msg: `Logged in !`,
          token,
          adminInfo: {
            adminId: interviewerInfo._id,
            firstName: interviewerInfo.firstName,
            lastName: interviewerInfo.lastName,
            role: policy.interviewer,
            email: interviewerInfo.email,
          },
          code: 'LOGGED_IN',
        })
      }
    } catch (err: any) {
      console.log(err)
      return res.status(500).json({
        msg: 'Something has failed.',
        err: err.message,
        code: 'INTERNAL_ERROR',
      })
    }
  }

/**
 * This is for development purpose only
 */

export const signUpHandler: RequestHandler<unknown, unknown, SignUpBody> =
  async (req, res) => {
    const { email, firstName, lastName, password, as } = req.body

    try {
      if (as === 'reviewer') {
        const isAlreadyRegistered = await Reviewer.findOne({
          email,
        })

        if (isAlreadyRegistered) {
          return res.json({
            msg: 'This email address is already registered.',
          })
        }

        const reviewer = new Reviewer({
          firstName,
          lastName,
          email,
          password,
        })

        await reviewer.save()

        res.json({
          msg: 'Successfully registered as a reviewer.',
        })
      }
      if (as === 'interviewer') {
        const isAlreadyRegistered = await Interviewer.findOne({
          email,
        })

        if (isAlreadyRegistered) {
          return res.json({
            msg: 'This email address is already registered.',
          })
        }

        const interviewer = new Interviewer({
          firstName,
          lastName,
          email,
          password,
        })

        await interviewer.save()

        res.json({
          msg: 'Successfully registered as a interviewer.',
        })
      }
    } catch (err) {
      res.json({
        msg: 'Something has failed.',
        err,
      })
    }
  }

// the user object on req here is automatically resolved to reviewer if
// the incoming user has a role on it.
export const userInfoHandler: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  const role = req?.role
  const { email } = req.user as any

  try {
    switch (role) {
      case policy.reviewer:
        // eslint-disable-next-line no-case-declarations
        const reviewerInfo = await Reviewer.findOne({ email }).populate({
          path: 'portfolioAssigned',
          model: 'PortfolioUrl',
          populate: {
            path: 'user',
            model: 'User',
          },
        })

        if (!reviewerInfo) {
          return res.json({
            msg: "We couldn't find any info for this account.",
          })
        }

        return res.json({
          adminInfo: {
            adminId: reviewerInfo._id,
            firstName: reviewerInfo.firstName,
            role: policy.reviewer,
            portfolioAssigned: reviewerInfo.portfolioAssigned ?? null,
            portfolioReviewed: reviewerInfo.portfolioReviewed ?? 0,
            reviewHistory: reviewerInfo.reviewHistory ?? [],
          },
          role: req?.role,
        })
      case policy.interviewer:
        // eslint-disable-next-line no-case-declarations
        const interviewerInfo = await Interviewer.findOne({ email })

        if (!interviewerInfo) {
          return res.json({
            msg: "We couldn't find any info for this account.",
            code: 'BAD_CREDENTIALS',
          })
        }
        return res.json({
          adminInfo: {
            adminId: interviewerInfo._id,
            firstName: interviewerInfo.firstName,
            lastName: interviewerInfo.lastName,
            role: policy.interviewer,
            email: interviewerInfo.email,
          },
          role: req?.role,
        })

      case policy.acInterviewer:
        // eslint-disable-next-line no-case-declarations
        const acInterviewerInfo = await Interviewer.findOne({ email })

        if (!acInterviewerInfo) {
          return res.json({
            msg: "We couldn't find any info for this account.",
            code: 'BAD_CREDENTIALS',
          })
        }
        return res.json({
          adminInfo: {
            adminId: acInterviewerInfo._id,
            firstName: acInterviewerInfo.firstName,
            lastName: acInterviewerInfo.lastName,
            role: policy.interviewer,
            email: acInterviewerInfo.email,
          },
          role: req?.role,
        })
      default:
        return res.json({
          msg: 'Something has failed.',
          code: 'INTERNAL_ERROR',
        })
    }
  } catch (e) {
    res.json({
      msg: 'Something has failed',
      error: e,
    })
  }
}

export const logoutHandler: RequestHandler = async (req, res) => {
  res.clearCookie('token')

  res.status(200).json({
    msg: 'Logged out successfully.',
  })
}
