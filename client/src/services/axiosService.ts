import { VerifySignature } from './../context/PaymentContext/PaymentContext.types'
import { TypeFormValues } from '../pages/interviewee/form'
import axios from 'axios'
import { User } from '../context/AuthContext'
import { LoginValues } from '../pages/auth/login'
import { SignUpValues } from '../pages/auth/signup'
import { submissionValues } from '../pages/submission'
import { reSubmissionValues } from '../pages/resubmission'
import { ISlot } from '../context/InterviewerContext'

const apiClient = axios.create({
  baseURL: `${process.env.API_URL}/api/`,
  withCredentials: true,
  headers: {
    'x-auth-token':
      typeof window !== 'undefined' && localStorage.getItem('x-auth-token'),
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('x-auth-token')
    if (token) {
      config.headers['x-auth-token'] = token
    }
    return config
  },
  (error) => Promise.reject(error)
)

/**
 * Auth Services
 * */
export const login = async (data: LoginValues) => {
  const response = await apiClient.post('/auth/sign-in', {
    ...data,
  })
  return response
}

export const register = async (data: SignUpValues) => {
  const response = await apiClient.post('/auth/sign-up', {
    ...data,
  })
  return response
}

interface SendVerificationTokenBody {
  verificationToken: string | undefined // this may be undefined possible .. need to check
}

export const sendVerificationToken = async (
  data: SendVerificationTokenBody
) => {
  const response = await apiClient.post('/auth/email-verification', {
    ...data,
  })
  return response
}

export const sendForgotPasswordRequest = async (data: { email: string }) => {
  const response = await apiClient.post('/auth/forgot-password', {
    ...data,
  })
  return response
}

export const sendPasswordResetRequest = async (
  passwordResetToken: string,
  newPassword: string
) => {
  const response = await apiClient.put(
    `/auth/reset-password/${passwordResetToken}`,
    {
      newPassword,
    }
  )
  return response
}

export const resendEmailVerificationLink = async (email: string) => {
  const response = await apiClient.post('/auth/email-verification/resend', {
    email,
  })
  return response
}

export const getUser = async () => {
  const response = await apiClient.get<User>('/auth/user-info')
  return response
}
export const getDashboard = async () => {
  const response = await apiClient.get('/dashboard-info')
  return response.data
}

export const logout = async () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('x-auth-token')
  }
  const response = await apiClient.post('/auth/logout')
  return response
}

export const resendLink = async (email: string | undefined) => {
  const response = await apiClient.post('/auth/email-verification/resend', {
    email,
  })
  return response
}

export const submissionLink = async (submissionData: submissionValues) => {
  const response = await apiClient.post('submit', {
    ...submissionData,
  })
  return response
}

export const reSubmissionLink = async (
  reSubmissionData: reSubmissionValues
) => {
  const response = await apiClient.post('resubmit', {
    ...reSubmissionData,
  })
  return response
}

/**
 * Admin + Reviewer Routes
 */
export const getAdmin = async () => {
  const response = await apiClient.get('/admin/user-info')
  return response
}

export const adminLogin = async (data: LoginValues) => {
  const response = await apiClient.post('/admin/sign-in', {
    ...data,
  })
  return response
}

/**
 * Interview Services
 */

export const admissionFormSubmission = async (formData: TypeFormValues) => {
  const response = await apiClient.post('submit-admission-form', {
    ...formData,
  })
  return response
}

export const getAdmissionFormData = async () => {
  const response = await apiClient.get('/interview/admission-form')
  return response
}

export const bookInterviewSlot = async (slotId: string) => {
  const response = await apiClient.post('/interview/book-slot', {
    slotId,
  })
  return response
}

export const getBookedIntervieweeSlots = async () => {
  const response = await apiClient.get('/interview/booked-slots')
  return response
}

export const addTimeSlot = async (data: ISlot) => {
  const response = await apiClient.post('/interview/add-slot', {
    ...data,
  })
  return response
}

export const getInterviewerSlots = async () => {
  const response = await apiClient.get('/interview/interviewer-slots')
  return response
}

export const getAvaliableSlots = async () => {
  const response = await apiClient.get('/interview/avaliable-slots')
  return response
}

export const deleteInterviewerSlot = async (slotId: string) => {
  const response = await apiClient.post('/interview/remove-slot', {
    slotId,
  })
  return response
}

export const getIntervieweeBookedSlots = async () => {
  const response = await apiClient.get('/interview/booked-slots')
  return response
}

/**
 * Reviewer Services
 */

// contains metadata to be sent to server to determine if portfolio is ready or not .
export interface ReviewBody {
  mark15Ready: boolean
  portfolioId: string
  reviewComment?: string
  linkedin?: number
  blogs?: number
  effort?: number
  projects?: number
}

export const requestPortfolio = async () => {
  const response = await apiClient.get('/reviewer/request-portfolio')
  return response
}

export const submitReview = async (data: ReviewBody) => {
  const response = await apiClient.post('/reviewer/submit-review', {
    ...data,
  })

  return response
}

/**
 * Payment Services
 */

export const makePayment = async (data: any) => {
  const response = await apiClient.post('/payment', {
    ...data,
  })
  return response
}

export const verifyPayment = async (data: VerifySignature) => {
  const response = await apiClient.post('/payment/verify', {
    ...data,
  })
  return response
}

export const recordPayment = async (data: any) => {
  const response = await apiClient.post('/payment/record', {
    ...data,
  })
  return response
}

/**
 * Marksheet Services
 */

export const submitMarksheet = async(data:any)=>{
  const response = await apiClient.post('/marksheet',{
    ...data,
  })
  return response
}