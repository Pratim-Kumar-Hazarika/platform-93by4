import { RequestHandler } from 'express'
import { AdmissionForm } from '../models/AdmissionForm'
import { Slot } from '../models/Slot'
import { AuthRequest, RouteResponse } from './../types/RequestWithUser.d'
// function for admission form submission
export const submitAdmissionForm: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  // get the user from the request
  const user = req.user
  // get the form data from the request
  const formData = req.body

  if (!user) {
    return res.status(401).json({
      message: 'You are not authorized to submit this form',
    })
  }

  try {
    // saving the form data to the database
    const form = new AdmissionForm({
      ...formData,
      user: user?._id,
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

export const addSlot: RequestHandler = async (req: AuthRequest, res) => {
  // get the user from the request
  const user = req.user
  // get the form data from the request
  const slotData = req.body

  if (!user) {
    return res.status(401).json({
      message: 'You are not authorized to submit this form',
    })
  }

  try {
    // saving the form data to the database
    const slot = new Slot({
      ...slotData,
      user: user?._id,
    })

    await slot.save()

    res.status(200).json({
      success: true,
      message: 'Slot booked successfully',
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Error while adding slot',
    })
  }
}
