import { Center, Spinner } from '@chakra-ui/react'
import { NextComponentType } from 'next'
import { useRouter } from 'next/router'
import { useAdminAuth } from './AdminContext'

const withAdminAuth = (WrappedComponent: NextComponentType) => {
  return (props: any) => {
    if (typeof window !== 'undefined') {
      const Router = useRouter()
      const { authState } = useAdminAuth()
      const isAuthenticated = authState?.isAuthenticated
      const isLoading = authState?.isLoading

      if (!isLoading && !isAuthenticated) {
        Router.push({
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
      return <WrappedComponent {...props} />
    }

    return null
  }
}

export default withAdminAuth
