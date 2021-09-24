import { Router } from 'express'
import {
  addSlot,
  getInterviewerTimeSlots,
  getIntervieweeBookedSlots,
  deleteInterviewerTimeSlot,
  getAllAvaliableSlots,
  bookInterviewSlot,
} from '../controllers/InterviewController'
import {
  getAdmissionFormData,
  submitAdmissionForm,
} from '../controllers/StudentController'
import { requiresAuth } from '../middleware/AuthMiddleware'
import { roleRequired } from '../middleware/CheckAccess'
import { policy } from '../utils/policy'

const router = Router()

// route for students/users/interviewees
router.route('/submit-admission-form').post(requiresAuth, submitAdmissionForm)
router.route('/admission-form').get(requiresAuth, getAdmissionFormData)
router.route('/avaliable-slots').get(requiresAuth, getAllAvaliableSlots)
router.route('/book-slot').post(requiresAuth, bookInterviewSlot)
router.route('/booked-slots').get(requiresAuth, getIntervieweeBookedSlots)

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

export default router
