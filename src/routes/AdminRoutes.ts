import { Router } from 'express'
import {
  signInHandler,
  signUpHandler,
  logoutHandler,
  userInfoHandler,
} from '../controllers/AdminController'
import { requiresAuth } from '../middleware/AuthMiddleware'
import { validate } from '../middleware/ValidateMiddleware'
import { signInSchema, signUpSchema } from '../validation/AuthValidation'

const router = Router()
/**
 * /admin/sign-in [POST]
 * /admin/sign-up [POST]
 * /admin/user-info [GET]
 * /admin/request-portfolio [GET/POST]
 * /admin/submit-review [POST]
 */
router.route('/sign-in').post(validate(signInSchema), signInHandler)
router.route('/sign-up').post(validate(signUpSchema), signUpHandler)
router.route('/logout').post(logoutHandler)

/**
 * TODO : add roleRequired middleware
 */
router.route('/user-info').get(requiresAuth, userInfoHandler)

export default router
