import { Router } from 'express'
import {
  assignPortfolioHandler,
  logoutHandler,
  reviewSubmitHandler,
  signInHandler,
  signUpHandler,
  userInfoHandler,
} from '../controllers/ReviewerControllers'
import { requiresAuth } from '../middleware/AuthMiddleware'
import { roleRequired } from '../middleware/CheckAccess'
import { validate } from '../middleware/ValidateMiddleware'
import { policy } from '../utils/policy'
import { signInSchema, signUpSchema } from '../validation/AuthValidation'

const router = Router()
/**
 * /reviewer/sign-in [POST]
 * /reviewer/sign-up [POST]
 * /reviewer/user-info [GET]
 * /reviewer/request-portfolio [GET/POST]
 * /reviewer/submit-review [POST]
 */
router.route('/sign-in').post(validate(signInSchema), signInHandler)
router.route('/sign-up').post(validate(signUpSchema), signUpHandler)
router.route('/logout').post(logoutHandler)

router
  .route('/user-info')
  .get(requiresAuth, roleRequired(policy.reviewer), userInfoHandler)

router
  .route('/request-portfolio')
  .get(requiresAuth, roleRequired(policy.reviewer), assignPortfolioHandler)

router
  .route('/submit-review')
  .post(requiresAuth, roleRequired(policy.reviewer), reviewSubmitHandler)

export = router
