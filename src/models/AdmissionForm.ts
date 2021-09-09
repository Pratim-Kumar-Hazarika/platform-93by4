import { Model, model, Schema } from 'mongoose'
interface AdmissionFormModel {
  'parent-name': string
  phone: string
  country: string
  'parent-relation': string
  state: string
  city: string
  'discord-id': string
  'twitter-url': string
  'telegram-id': string
  'linkedin-url': string
  'educational-status': string
  'have-cs-background': string
  'education-status-brief': string
  'selection-reason': string
  'how-you-get-to-know-about-neog': string
  'reason-for-joining': string
  'mode-of-payment': string
  'year-of-graduation': string
  'financial-aid-check': string
  'correct-info-check': string
  'agree-policy-check': string
  user: {
    type: Schema.Types.ObjectId
    rel: 'User'
  }
}

const AdmissionFormSchema = new Schema<
  AdmissionFormModel,
  Model<AdmissionFormModel>,
  AdmissionFormModel
>(
  {
    'parent-name': {
      type: String,
      required: [true, 'Parent name is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
    },
    'parent-relation': {
      type: String,
      required: [true, 'Parent relation is required'],
    },
    state: {
      type: String,
      required: [true, 'State is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    'discord-id': {
      type: String,
      required: [true, 'Discord ID is required'],
    },
    'twitter-url': {
      type: String,
    },
    'telegram-id': {
      type: String,
    },
    'linkedin-url': {
      type: String,
      required: [true, 'Linkedin URL is required'],
    },
    'educational-status': {
      type: String,
      required: [true, 'Educational status is required'],
    },
    'have-cs-background': {
      type: String,
      required: [true, 'Have CS background is required'],
    },
    'education-status-brief': {
      type: String,
      required: [true, 'Education status brief is required'],
    },
    'selection-reason': {
      type: String,
      required: [true, 'Selection reason is required'],
    },
    'how-you-get-to-know-about-neog': {
      type: String,
      required: [true, 'How you get to know about NEOG is required'],
    },
    'reason-for-joining': {
      type: String,
      required: [true, 'Reason for joining is required'],
    },
    'mode-of-payment': {
      type: String,
      required: [true, 'Mode of payment is required'],
    },
    'year-of-graduation': {
      type: String,
      required: [true, 'Year of graduation is required'],
    },
    'financial-aid-check': {
      type: String,
      required: [true, 'Financial aid check is required'],
    },
    'correct-info-check': {
      type: String,
      required: [true, 'Correct info check is required'],
    },
    'agree-policy-check': {
      type: String,
      required: [true, 'Agree policy check is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

export const AdmissionForm = model<AdmissionFormModel>(
  'AdmissionForm',
  AdmissionFormSchema
)
