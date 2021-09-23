import { Router } from 'express'
import {
  assignPortfolioHandler,
  reviewSubmitHandler,
} from '../controllers/ReviewerControllers'
import { requiresAuth } from '../middleware/AuthMiddleware'
import { roleRequired } from '../middleware/CheckAccess'
import { policy } from '../utils/policy'

const router = Router()

router
  .route('/request-portfolio')
  .get(requiresAuth, roleRequired(policy.reviewer), assignPortfolioHandler)

router
  .route('/submit-review')
  .post(requiresAuth, roleRequired(policy.reviewer), reviewSubmitHandler)

export = router
