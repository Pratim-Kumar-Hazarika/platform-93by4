import { RequestHandler } from 'express'
import { IReviewer, Reviewer } from '../models/Reviewer'
import { SignInBody, SignUpBody } from '../validation/AuthValidation'
import { createToken } from '../utils/authUtils'
import { AuthRequest } from '../types/RequestWithUser'
import { PortfolioUrl } from '../models/Portfolio'
import { ReviewBody } from '../validation/ReviewerValidation'
import { Email } from '../utils/mailer'
/**
 * @description Signs in the reviewer user. Sends a token containing appropriate role.
 */
export const signInHandler: RequestHandler<unknown, unknown, SignInBody> =
  async (req, res) => {
    const { email, password } = req.body

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

export const assignPortfolioHandler: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  // Typecasting this because we are sure this is not hit by student
  const { email } = req.user as IReviewer

  /**
   * pick up the portfolios with flag status as "Portfolio_under_review"
   * and the least submission number to serve FCFS 》mark it's status
   * as live review so that if some other reviewer is reviewing at the
   * same time he gets another portfolio.
   */
  try {
    const currentReviewer = await Reviewer.findOne({
      email,
    }).populate({
      path: 'portfolioAssigned',
      model: 'PortfolioUrl',
    })

    // if a reviewer already has one assigned, he won't be able to request more
    if (currentReviewer?.portfolioAssigned) {
      return res.json({
        msg: 'You cannot request for new portfolio because you are already assigned one.',
        code: 'ALREADY_ASSIGNED',
      })
    }

    // Find one portfolio with this status and minimum submission number.
    const portfolio = await PortfolioUrl.find({
      status: 'portfolio_under_review',
    })
      .select('+_id')
      .sort({
        submissionNo: +1,
      })
      .limit(1)

    // If there is none
    if (!portfolio[0]) {
      return res.json({
        msg: "There's no portfolio left to review for now.",
        code: 'NO_PORTFOLIO_LEFT',
      })
    }

    // assign current reviewer a portfolio we just found
    if (currentReviewer) {
      currentReviewer.portfolioAssigned = portfolio[0]
      portfolio[0].status = 'getting_reviewed'
      await portfolio[0].save()
      await currentReviewer.save()
    }

    return res.json({
      code: 'PORTFOLIO_ASSIGNED',
      reviewerInfo: currentReviewer,
    })
  } catch (e) {
    return res.json({
      msg: 'Something failed',
      err: e,
    })
  }
}

export const reviewSubmitHandler: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  const {
    mark15Ready,
    reviewComment,
    portfolioId,
    linkedin,
    blogs,
    effort,
    projects,
  } = req.body as ReviewBody

  const { email } = req.user as IReviewer

  const portfolio = await PortfolioUrl.findOne({
    _id: portfolioId,
  }).populate('user')

  const currentReviewer = await Reviewer.findOne({
    email,
  }).populate('portfolioAssigned')

  if (!portfolio) {
    return res.json({
      msg: 'No portfolio found with given ID',
    })
  }

  // means you have already passed feedback on this portfolio
  if (portfolio.status === 'portfolio_needs_revision') {
    return res.json({
      msg: 'Your feedback for this portfolio is already submitted',
      code: 'DUPLICATED_FEEDBACK',
    })
  }

  // Super RARE CASE
  if (portfolio.status === 'portfolio_passed') {
    return res.json({
      msg: 'This portfolio has been already reviewed.',
      code: 'DUPLICATED_FEEDBACK',
    })
  }

  // if mark15 ready
  if (mark15Ready && currentReviewer) {
    // change status from 'getting_reviewed' to 'portfolio_passed'
    portfolio.status = 'portfolio_passed'

    portfolio.portfolioMarks = { linkedin, blogs, effort, projects }

    portfolio.reviewComments?.push({
      author: currentReviewer.firstName + ' ' + currentReviewer.lastName,
      comment: reviewComment,
      date: new Date(),
    })

    await portfolio.save()

    // Remove their existing assigned portfolio
    await Reviewer.findByIdAndUpdate(currentReviewer._id, {
      $unset: {
        portfolioAssigned: 1,
      },
    })

    //add this portfolio as history for reviewer
    currentReviewer.reviewHistory.push({
      date: new Date(),
      portfolioUrl: portfolio.portfolioUrl,
    })

    // increment no. of portfolios reviewed number by 1. If it's their first time, put one.
    currentReviewer.portfolioReviewed = currentReviewer.portfolioReviewed
      ? currentReviewer.portfolioReviewed + 1
      : 1

    await currentReviewer.save()

    res.json({
      msg: 'Thank you for reviewing this portfolio.',
      code: 'REVIEW_COMPLETE',
    })
  }

  // else we know portfolio is not mark15 ready
  // change status of portfolio
  if (!mark15Ready && currentReviewer) {
    // change status of portfolio from 'under=review' to 'needs_revision'
    portfolio.status = 'portfolio_needs_revision'

    portfolio.reviewComments?.push({
      author: currentReviewer.firstName + ' ' + currentReviewer.lastName,
      comment: reviewComment,
      date: new Date(),
    })

    await Reviewer.findByIdAndUpdate(currentReviewer._id, {
      $unset: {
        portfolioAssigned: 1,
      },
    })

    await portfolio.save()

    currentReviewer.portfolioReviewed = currentReviewer.portfolioReviewed
      ? currentReviewer.portfolioReviewed + 1
      : 1

    await currentReviewer.save()

    res.json({
      msg: 'Thank you for reviewing this portfolio.',
      code: 'REVIEW_COMPLETE',
    })
  }

  const response = await new Email({
    email: portfolio.user.email,
    firstName: portfolio.user.firstName,
  }).send({
    subject: '[neoG Camp] Your portfolio has been reviewed.',
    template: 'review-finished',
    variables: {
      dashboardLink: 'https://admissions.neog.camp/',
    },
  })

  /**
   * [x] mark15Ready @type {boolean} -
   * If false, portfolio needs revision, if true, portfolio_passed
   * reviewComment @type {string}
   * Author Info (from request context)
   *
   * if review given, remove portfolio as assigned to someone .
   * RESPONSE
   * comments + previous comments on portfolio + by whom
   *
   * if mark15 ready, push it as reviewed for reviewer and increment their number of portfolios
   * reviewed by one .
   */
}

export const logoutHandler: RequestHandler = async (req, res) => {
  res.clearCookie('token')

  res.status(200).json({
    msg: 'Logged out successfully.',
  })
}
