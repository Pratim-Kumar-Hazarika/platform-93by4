import {RequestHandler} from 'express'
import {AuthRequest} from '../types/RequestWithUser'
import {Marksheet} from '../models/Marksheet';

export const getStudentMarksheet : RequestHandler = async(req, res) => {
    const TheReq = {
        userId: "614f26f4d77fbe5550d398fd"
    }
    try {
        const user = TheReq
        const getStudentMarksheet = await Marksheet.findOne({user:user.userId}).populate("user")
        res.json({message:"Student Marksheet is => ", getStudentMarksheet})
    } catch (error) {
        res.json({errorMessage:"Student Marksheet doesn't exist"})
    }
}

export const submitMarksheet : RequestHandler = async(req, res) => {
    const TheReq = {
        userId: "614f26f4d77fbe5550d398fd"
    }
    try {
        const user = TheReq  /// change here..
        const findStudent = await Marksheet.findOne({_id :user.userId})
        if (findStudent === null) {
            const NewMarksheet = new Marksheet({
                _id:user.userId,
                ...req.body,
            })
            await  NewMarksheet.save()
            return res.json({message:"Marksheet was submitted successfully"})
        } else {
            //Update marksheet need to build later
            await Marksheet.updateOne({"_id": user.userId},{
                "$set":{
                   "passingStatus":req.body.passingStatus
                }
            })
            return res.json({message: "Marksheet was updated successfully"})
        }
    } catch (error) {
        res.status(500).json({errorMessage: error})
    }
}