import { Router } from 'express'
import {
  createPayment,
  recordPayment,
  verifySignature,
} from '../controllers/PaymentController'
import { requiresAuth } from '../middleware/AuthMiddleware'

const router = Router()

/**
 * Sign Up Route
 * Accepts a JSON Body with firstName, lastName, email and password
 * All routes are prefixed with /api/auth/
 * */
// TODO -> add validation middleware

router.route('/').post(requiresAuth, createPayment)
router.route('/record').post(requiresAuth, recordPayment)
router.route('/verify').post(requiresAuth, verifySignature)

export default router
