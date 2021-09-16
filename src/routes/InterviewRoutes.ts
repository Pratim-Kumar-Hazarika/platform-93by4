import { Router } from 'express'
import {
  addSlot,
  submitAdmissionForm,
} from '../controllers/InterviewController'
import { requiresAuth } from '../middleware/AuthMiddleware'

const router = Router()

router.route('/submit-admission-form').post(requiresAuth, submitAdmissionForm)
router.route('/add-slot').post(requiresAuth, addSlot)

export = router
