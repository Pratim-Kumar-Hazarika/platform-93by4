import { extend } from 'lodash'
import { RequestHandler } from 'express'
import { Slot } from '../models/Slot'
import { AuthRequest } from './../types/RequestWithUser.d'

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
      interviewer: user?._id,
      status: 'open',
    })

    await slot.save()

    res.status(200).json({
      success: true,
      message: 'Slot booked successfully',
      slot: {
        ...slot.toObject(),
      },
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Error while adding slot',
    })
  }
}

export const getInterviewerTimeSlots: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  // get the user from the request
  const user = req.user

  if (!user) {
    return res.status(401).json({
      message: 'You are not authorized to submit this form',
    })
  }

  try {
    // query the database for slots
    const slots = await Slot.find({
      interviewer: user?._id,
    }).populate('interviewee')
    res.status(200).json({
      slots,
      success: true,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Error while getting slots',
    })
  }
}

export const getAllAvaliableSlots: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  // get the user from the request
  const user = req.user

  if (!user) {
    return res.status(401).json({
      message: 'You are not authorized to submit this form',
    })
  }

  try {
    // query the database for slots that from and to are greater than the current time
    const currentTimestamp = new Date().toISOString()
    const slots = await Slot.find({
      status: 'open',
      to: { $gt: currentTimestamp },
    })

    res.status(200).json({
      slots,
      success: true,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Error while getting slots',
    })
  }
}

export const getIntervieweeBookedSlots: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  // get the user from the request
  const user = req.user

  if (!user) {
    return res.status(401).json({
      message: 'You are not authorized to submit this form',
    })
  }

  try {
    // query the database for slots
    const slots = await Slot.find({
      interviewee: user?._id,
    })

    res.status(200).json({
      slots,
      success: true,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Error while getting slots',
    })
  }
}

export const bookInterviewSlot: RequestHandler = async (
  req: AuthRequest,
  res
) => {
  try {
    // get the user from the request
    const user = req.user
    // get the form data from the request
    const { slotId, gmeetLink } = req.body

    if (!user)
      return res.status(401).json({ message: 'You are not authorized' })

    if (!slotId) return res.status(400).json({ message: 'Slot id is required' })

    const slot = await Slot.findById(slotId)

    if (!slot) return res.status(400).json({ message: 'Slot not found' })

    if (slot.status !== 'open')
      res.status(400).json({ message: 'Slot is not open' })

    const fromDateParsed = new Date(slot.from)

    const updatedSlot = new Slot(
      extend(slot, {
        status: 'booked',
        link: gmeetLink,
        interviewee: user._id,
      })
    )

    await updatedSlot.save()

    res.status(200).json({
      success: true,
      message: 'Slot booked successfully',
      slot: {
        ...updatedSlot.toObject(),
      },
    })
  } catch (err) {
    console.log(err, 'error while booking slot for interviewee')
    return res.status(500).json({
      success: false,
      message: 'Error while booking slot',
    })
  }
}

export const deleteInterviewerTimeSlot: RequestHandler = async (
  req: AuthRequest,
  res
) => {
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
    // query the database for slots
    const slots = await Slot.findByIdAndDelete(slotData.slotId)

    res.status(200).json({
      slots,
      success: true,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Error while getting slots',
    })
  }
}
