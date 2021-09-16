import { SignInBody, SignUpBody } from './../validation/AuthValidation'
import { RequestHandler } from 'express'
import { AuthRequest } from './../types/RequestWithUser.d'
import { IReviewer, Reviewer } from '../models/Reviewer'
import { createToken } from '../utils/authUtils'

export const reviewHandler: RequestHandler = async (
  req: AuthRequest,
  res: any
) => {}

export const adminInfoHandler: RequestHandler = async (
  req: AuthRequest,
  res: any
) => {}

/**
 * @description Signs in the reviewer user. Sends a token containing appropriate role.
 */
export const signInHandler: RequestHandler<unknown, unknown, SignInBody> =
  async (req, res) => {
    const { email, password, role } = req.body

    try {
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
        role: 20,
        _id: reviewerInfo._id,
        email: reviewerInfo.email,
      })

      res.json({
        msg: `Logged in !`,
        token,
        reviewerInfo,
        code: 'LOGGED_IN',
      })
    } catch (err) {
      console.log(err)
      return res.json({
        msg: 'Something has failed.',
        err,
        code: 'INTERNAL_ERROR',
      })
    }
  }

/**
 * This is for development purpose only
 */

export const signUpHandler: RequestHandler<unknown, unknown, SignUpBody> =
  async (req, res) => {
    const { email, firstName, lastName, password } = req.body

    try {
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
  const { email } = req.user as IReviewer

  try {
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

    res.json({ reviewerInfo })
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
