import { createContext, useReducer, ReactNode } from 'react'

export interface Slot {
  from: string
  to: string
}

interface InterviewerState {
  slots: Array<Slot>
}

interface InterviewerSetSlots {
  type: 'SET_SLOTS'
  payload: Array<Slot>
}

interface InterviewerAddSlot {
  type: 'ADD_SLOT'
  payload: Slot
}

interface InterviewerContextValue {
  interviewerState: InterviewerState
  interviewerDispatch: React.Dispatch<InterviewerAction>
}

export type InterviewerAction = InterviewerSetSlots | InterviewerAddSlot

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
    default:
      return state
  }
}

export function InterviewerContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [interviewerState, interviewerDispatch] = useReducer(
    interviewerReducer,
    initalState
  )
  return (
    <InterviewerContext.Provider
      value={{ interviewerDispatch, interviewerState }}
    >
      {children}
    </InterviewerContext.Provider>
  )
}
