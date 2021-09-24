import { Action, InitialStateofReducer } from './PaymentContext.types'

export function paymentReducer(state: InitialStateofReducer, action: Action) {
  switch (action.type) {
    case 'SET_FIRST_NAME':
      return { ...state, userFirstName: action.payload.userFirstName }
    case 'SET_LAST_NAME':
      return { ...state, userLastName: action.payload.userLastName }
    case 'SET_MOBILE_NUMBER':
      return { ...state, userMobile: action.payload.userMobile }
    case 'SET_CITY':
      return { ...state, userCity: action.payload.userCity }
    case 'SET_STATE':
      return { ...state, userState: action.payload.userState }
    case 'SET_COUNTRY':
      return { ...state, userCountry: action.payload.userCountry }
    case 'SET_EMAIL':
      return { ...state, userEmail: action.payload.userEmail }
    case 'SET_LOGIN_EMAIL':
      return { ...state, userLoginEmail: action.payload.userLoginEmail }
    default:
      return state
  }
}
