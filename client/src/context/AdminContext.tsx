import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getAdmin } from '../services/axiosService'
import { Policy } from '../utils/policy'

interface PortfolioAssigned {
  portfolioUrl: string
  resubmissionCount: number
  reviewComments?: Array<Record<string, string>>
  status: string
  submissionNo: number
  user: Record<string, string>
  _id: string
}

export interface Admin {
  adminId?: string
  firstName?: string
  role: Policy['reviewer']
  portfolioAssigned?: PortfolioAssigned
  portfolioReviewed?: number
  reviewHistory?: Array<Record<string, unknown>>
}

export interface IInterviewer {
  adminId: string
  email: string
  firstName: string
  lastName: string
  role: Policy['interviewer']
}

export interface AdminAuthState {
  admin: Admin | IInterviewer | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AdminAuthInitialState {
  authState: AdminAuthState | null
  setState: (authInfo: AdminAuthState) => void
  setAuthState: Dispatch<SetStateAction<AdminAuthState>>
}
const defaultState: AdminAuthState = {
  admin: null,
  isAuthenticated: false,
  isLoading: true,
}

const AdminContext = createContext<AdminAuthInitialState>({
  authState: defaultState,
  setState: () => {},
  setAuthState: () => {},
})

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [adminState, setAdminState] = useState<AdminAuthState>(defaultState)

  useEffect(() => {
    const getAdminInfo = async () => {
      try {
        const res = await getAdmin()
        console.log(res.data?.adminInfo)
        setAdminState({
          admin: res.data?.adminInfo,
          isAuthenticated: true,
          isLoading: false,
        })
      } catch (e) {
        setAdminState({
          admin: null,
          isAuthenticated: false,
          isLoading: false,
        })
      }
    }

    getAdminInfo()
  }, [])

  function setAuthInfo(data: AdminAuthState) {
    setAdminState({
      admin: data.admin,
      isAuthenticated: data.isAuthenticated,
      isLoading: data.isLoading,
    })
  }

  return (
    <AdminContext.Provider
      value={{
        authState: adminState,
        setState: (authInfo: AdminAuthState) => setAuthInfo(authInfo),
        setAuthState: setAdminState,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an <AdminAuthProvider/>')
  }
  return context
}
