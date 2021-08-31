import { NextFunction, Response } from 'express'
import { IReviewer } from '../models/Reviewer'
import { AuthRequest } from '../types/RequestWithUser'

export function roleRequired(minRoleNumber: number, maxRoleNumber = 100) {
  return async function checkAccess(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    const role = (req.user as IReviewer).role
    if (!role) {
      return res.json({ msg: 'No role was found on this user' })
    }
    // user at not sufficient level
    if (role < minRoleNumber) {
      return res.json({
        msg: `Your role ${role} is not sufficient to access this resource`,
        code: 'ERR_INSUFFICIENT_ACCESS_LEVEL',
      })
    }
    // Direct Access if you're a superadmin
    if (role === 100) {
      console.log('👋 Access Granted SuperAdmin')
      next()
    }
    // Check to see if the user is at a sufficient level
    if (role >= minRoleNumber && role <= maxRoleNumber) {
      console.log('Permission granted')
      next()
    } else {
      return res.json({
        msg: `Your role ${role} is not sufficient to access this resource`,
        code: 'ERR_INSUFFICIENT_ACCESS_LEVEL',
      })
    }
  }
}
