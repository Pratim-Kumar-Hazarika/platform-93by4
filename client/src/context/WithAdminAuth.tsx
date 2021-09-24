import { Center, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import { NextComponentType } from 'next'
import { useRouter } from 'next/router'
import { policy } from '../utils/policy'
import { useAdminAuth } from './AdminContext'

const getDashboardUrlBasedOnRole = (roleRequired: number | undefined) => {
  switch (roleRequired) {
    case policy['reviewer']:
      return '/admin/dashboard'
    case policy['interviewer']:
      return '/interviewer'
    case policy['acInterviewer']:
      return '/interviewer'
    default:
      return '/'
  }
}

const withAdminAuth = (
  WrappedComponent: NextComponentType,
  requiredRole?: number | Array<number>
) => {
  return (props: any) => {
    if (typeof window !== 'undefined') {
      const router = useRouter()
      const { authState } = useAdminAuth()
      const isAuthenticated = authState?.isAuthenticated
      const isLoading = authState?.isLoading
      const adminRole = authState?.admin?.role
      const roleRequired = Array.isArray(requiredRole)
        ? requiredRole
        : [requiredRole]
      const dashboardUrl = getDashboardUrlBasedOnRole(adminRole)
      console.log(roleRequired, dashboardUrl, adminRole)

      if (!isLoading && !isAuthenticated) {
        router.push({
          pathname: '/',
        })
        return (
          <Center minH="100vh">
            <Spinner />
          </Center>
        )
      }

      if (isLoading) {
        return (
          <Center minH="100vh">
            <Spinner />
          </Center>
        )
      }

      // if our role is not in the required roles, redirect to dashboard
      if (
        requiredRole &&
        adminRole &&
        !router.pathname?.includes(dashboardUrl) &&
        !roleRequired.includes(adminRole)
      ) {
        router.push({
          pathname: dashboardUrl,
        })
        return (
          <Center minH="100vh">
            <Spinner />
          </Center>
        )
      }

      return <WrappedComponent {...props} />
    }

    return null
  }
}

export default withAdminAuth
