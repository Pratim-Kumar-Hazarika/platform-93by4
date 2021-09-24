import {
  Dispatch,
  SetStateAction,
} from 'hoist-non-react-statics/node_modules/@types/react'

export type DetailsFormInput = {
  email: string
  first_name: string
  last_name: string
  state: string
  city: string
  country: string
  phone: string
}

export type InitialStateofReducer = {
  userFirstName: string
  userLastName: string
  userMobile: string
  userCity: string
  userState: string
  userCountry: string
  userEmail: string
  userLoginEmail: string
}

export type PaymentContextValue = {
  openRazorpay: (
    amount: number,
    currency?: string,
    type?: string,
    updateOptions?: any
  ) => Promise<false | ServerError | undefined>
}

export type OrderResponse = {
  amount: number
  currency: string
  id: string
}

export type HandlerResponse = {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

export type VerifySignature = {
  orderCreationId: string
  razorpayPaymentId: string
  razorpaySignature: string
}

export type PaymentHandlerArguments = {
  response: HandlerResponse
  status: string
  description?: string
  setLoading?: Dispatch<SetStateAction<boolean>>
}
export type ServerError = { errorMessage: string }

export type Validations = {
  value: string
  dispatch: any
}

export const initialState: InitialStateofReducer = {
  userFirstName: '',
  userLastName: '',
  userMobile: '',
  userCity: '',
  userState: '',
  userCountry: '',
  userEmail: '',
  userLoginEmail: '',
}

export type Action =
  | { type: 'SET_FIRST_NAME'; payload: { userFirstName: string } }
  | { type: 'SET_LAST_NAME'; payload: { userLastName: string } }
  | { type: 'SET_MOBILE_NUMBER'; payload: { userMobile: string } }
  | { type: 'SET_CITY'; payload: { userCity: string } }
  | { type: 'SET_STATE'; payload: { userState: string } }
  | { type: 'SET_COUNTRY'; payload: { userCountry: string } }
  | { type: 'SET_EMAIL'; payload: { userEmail: string } }
  | { type: 'SET_LOGIN_EMAIL'; payload: { userLoginEmail: string } }
