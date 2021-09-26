import { useEffect } from 'react'
import { createContext, useReducer, ReactNode, useContext } from 'react'
import {
  getAvaliableSlots,
  getBookedIntervieweeSlots,
} from '../services/axiosService'
import { useAuth } from './AuthContext'
import { ISlot } from './InterviewerContext'

interface IntervieweeState {
  slots: Array<ISlot> | undefined
  bookedSlots: Array<ISlot> | undefined
}

interface IntervieweeSetSlots {
  type: 'SET_SLOTS'
  payload: Array<ISlot>
}

interface IntervieweeAddSlot {
  type: 'ADD_SLOT'
  payload: ISlot
}

interface IntervieweeDeleteSlot {
  type: 'DELETE_SLOT'
  payload: string
}

interface IntervieweeUpdateSlot {
  type: 'UPDATE_SLOT'
  payload: ISlot
}

interface IntervieweeAddScheduledMeet {
  type: 'ADD_SCHEDULED_SLOT'
  payload: ISlot
}

interface IntervieweeContextValue {
  intervieweeState: IntervieweeState
  intervieweeDispatch: React.Dispatch<IntervieweeAction>
}

interface IntervieweeAddScheduledSlots {
  type: 'ADD_SCHEDULED_SLOTS'
  payload: Array<ISlot>
}

export type IntervieweeAction =
  | IntervieweeSetSlots
  | IntervieweeAddSlot
  | IntervieweeDeleteSlot
  | IntervieweeUpdateSlot
  | IntervieweeAddScheduledMeet
  | IntervieweeAddScheduledSlots

const initalState: IntervieweeState = {
  slots: undefined,
  bookedSlots: undefined,
}

const IntervieweeContext = createContext<IntervieweeContextValue>(
  {} as IntervieweeContextValue
)

function intervieweeReducer(
  state: IntervieweeState,
  action: IntervieweeAction
): IntervieweeState {
  switch (action.type) {
    case 'SET_SLOTS':
      return {
        ...state,
        slots: action.payload,
      }
    case 'ADD_SLOT':
      return {
        ...state,
        slots: [...(state?.slots || []), action.payload],
      }
    case 'UPDATE_SLOT':
      return {
        ...state,
        slots: (state?.slots || [])?.map((slot) => {
          if (slot?._id === action.payload?._id) {
            return action.payload
          }
          return slot
        }),
      }
    case 'ADD_SCHEDULED_SLOTS':
      return {
        ...state,
        bookedSlots: [...(state?.bookedSlots || []), ...action.payload],
      }
    case 'ADD_SCHEDULED_SLOT':
      return {
        ...state,
        bookedSlots: [...(state?.bookedSlots || []), action.payload],
      }
    case 'DELETE_SLOT':
      return {
        ...state,
        slots: (state?.slots || [])?.filter(
          (slot: ISlot) => slot?._id !== action.payload
        ),
      }
    default:
      return state
  }
}

export function IntervieweeDetailsProvider({
  children,
}: {
  children: ReactNode
}) {
  const [intervieweeState, intervieweeDispatch] = useReducer(
    intervieweeReducer,
    initalState
  )
  const { authState } = useAuth()
  useEffect(() => {
    // fetch slots
    if (!authState?.isLoading && authState?.isAuthenticated) {
      const fetchSlots = async () => {
        try {
          const resSlots = await getAvaliableSlots()
          const resBookedSlots = await getBookedIntervieweeSlots()
          // dispatch slots
          intervieweeDispatch({
            type: 'SET_SLOTS',
            payload: resSlots?.data?.slots || [],
          })
          intervieweeDispatch({
            type: 'ADD_SCHEDULED_SLOTS',
            payload: resBookedSlots?.data?.slots || [],
          })
        } catch (error) {
          console.log('error while fetching interviewee slots', error)
        }
      }
      fetchSlots()
    }
  }, [authState?.isLoading, authState?.isAuthenticated])
  return (
    <IntervieweeContext.Provider
      value={{ intervieweeDispatch, intervieweeState }}
    >
      {children}
    </IntervieweeContext.Provider>
  )
}

export default function useIntervieweeDetails(): IntervieweeContextValue {
  const context = useContext(IntervieweeContext)
  if (!context) {
    throw new Error('IntervieweeContext not found')
  }
  return context
}
