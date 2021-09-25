import {Model, model, ObjectId, Schema} from 'mongoose'

export interface Marksheet {
    _id : any
    codeInput : number
    codeProcessing : number
    codeOutput : number
    conceptualQuestions : number
    duringLiveCoding : number
    communication : number
    captain : boolean
    financialAid : boolean
    feedbacks : string
    passingStatus:string 
    user : any 
}

const MarksheetSchema = new Schema < Marksheet,
    Model < Marksheet >,
    Marksheet > ({
        codeInput: {
            type: Number,
            required: true
        },
        codeProcessing: {
            type: Number,
            required: true
        },
        codeOutput: {
            type: Number,
            required: true
        },
        conceptualQuestions: {
            type: Number,
            required: true
        },
        duringLiveCoding: {
            type: Number,
            required: true
        },
        communication: {
            type: Number,
            required: true
        },
        captain: {
            type: Boolean,
            default:false,
            required:true,
        },
        financialAid: {
            type: Boolean,
            default:false,
            required:true,
        },
        feedbacks: {
            type: String,
            required: false
        },
        passingStatus:{
            type:String,
            enum: {
                values: ['Parked', 'Passed','Rejected'],
                message: '{VALUE} is not supported'
              },
            required:true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }, {
        timestamps: true,
    })

export const Marksheet = model < Marksheet,
    Model < Marksheet >> ('Marksheet', MarksheetSchema)
