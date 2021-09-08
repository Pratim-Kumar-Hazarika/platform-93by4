import { Router } from 'express'
import { submitAdmissionForm } from '../controllers/InterviewController'
import { requiresAuth } from '../middleware/AuthMiddleware'

const router = Router()

router.route('/submit-admission-form').post(requiresAuth, submitAdmissionForm)

export = router
