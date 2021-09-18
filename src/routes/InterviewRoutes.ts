import { Router } from 'express'
import {
  addSlot,
  getInterviewerTimeSlots,
  submitAdmissionForm,
  getIntervieweeBookedSlots,
  deleteInterviewerTimeSlot,
} from '../controllers/InterviewController'
import { requiresAuth } from '../middleware/AuthMiddleware'
import { roleRequired } from '../middleware/CheckAccess'
import { policy } from '../utils/policy'

const router = Router()

// route for students/users
router.route('/submit-admission-form').post(requiresAuth, submitAdmissionForm)

// routes for interviewer
router
  .route('/add-slot')
  .post(requiresAuth, roleRequired(policy['interviewer']), addSlot)

router
  .route('/interviewer-slots')
  .get(
    requiresAuth,
    roleRequired(policy['interviewer']),
    getInterviewerTimeSlots
  )

router
  .route('/remove-slot')
  .post(
    requiresAuth,
    roleRequired(policy['interviewer']),
    deleteInterviewerTimeSlot
  )

// routes for interviewee
router.route('/booked-slots').get(requiresAuth, getIntervieweeBookedSlots)

export default router
