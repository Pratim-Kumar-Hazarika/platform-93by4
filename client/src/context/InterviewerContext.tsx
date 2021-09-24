import { useEffect } from 'react'
import { createContext, useReducer, ReactNode, useContext } from 'react'
import { getInterviewerSlots } from '../services/axiosService'
import { useAuth } from './AuthContext'

export interface ISlot {
  _id?: string
  from: string
  to: string
  status?: string
  interviewer?: string
  interviewee?: string
  createdAt?: string
}

interface InterviewerState {
  slots: Array<ISlot>
}

interface InterviewerSetSlots {
  type: 'SET_SLOTS'
  payload: Array<ISlot>
}

interface InterviewerAddSlot {
  type: 'ADD_SLOT'
  payload: ISlot
}

interface InterviewerDeleteSlot {
  type: 'DELETE_SLOT'
  payload: string
}

interface InterviewerContextValue {
  interviewerState: InterviewerState
  interviewerDispatch: React.Dispatch<InterviewerAction>
}

export type InterviewerAction =
  | InterviewerSetSlots
  | InterviewerAddSlot
  | InterviewerDeleteSlot

const initalState: InterviewerState = {
  slots: [],
}

const InterviewerContext = createContext<InterviewerContextValue>(
  {} as InterviewerContextValue
)

function interviewerReducer(
  state: InterviewerState,
  action: InterviewerAction
): InterviewerState {
  switch (action.type) {
    case 'SET_SLOTS':
      return {
        ...state,
        slots: action.payload,
      }
    case 'ADD_SLOT':
      return {
        ...state,
        slots: [...state.slots, action.payload],
      }
    case 'DELETE_SLOT':
      return {
        ...state,
        slots: state.slots.filter(
          (slot: ISlot) => slot?._id !== action.payload
        ),
      }
    default:
      return state
  }
}

export function InterviewerDetailsProvider({
  children,
}: {
  children: ReactNode
}) {
  const [interviewerState, interviewerDispatch] = useReducer(
    interviewerReducer,
    initalState
  )
  const { authState } = useAuth()
  useEffect(() => {
    // fetch slots
    if (!authState?.isLoading && authState?.isAuthenticated) {
      const fetchSlots = async () => {
        try {
          const resSlots = await getInterviewerSlots()

          console.log('interviewer slots', resSlots.data)

          // dispatch slots
          interviewerDispatch({
            type: 'SET_SLOTS',
            payload: resSlots.data?.slots,
          })
        } catch (err) {
          console.log('error while fetching interviewer slots', err)
        }
      }
      fetchSlots()
    }
  }, [authState?.isLoading, authState?.isAuthenticated])
  return (
    <InterviewerContext.Provider
      value={{ interviewerDispatch, interviewerState }}
    >
      {children}
    </InterviewerContext.Provider>
  )
}

export default function useInterviewerDetails(): InterviewerContextValue {
  const context = useContext(InterviewerContext)
  if (!context) {
    throw new Error('InterviewerContext not found')
  }
  return context
}
