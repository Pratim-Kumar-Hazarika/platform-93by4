import { RequestHandler } from 'express'
import { AdmissionForm } from '../models/AdmissionForm'
import { AuthRequest, RouteResponse } from './../types/RequestWithUser.d'
// function for admission form submission
export async function submitAdmissionForm<RequestHandler>(
  req: AuthRequest,
  res: RouteResponse
) {
  // get the user from the request
  const user = req.user
  // get the form data from the request
  const formData = req.body

  console.log(formData)
  console.log(user)

  try {
    // saving the form data to the database
    const form = new AdmissionForm({
      ...formData,
      user: user!._id,
    })

    await form.save()

    res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Error submitting form',
    })
  }
}
