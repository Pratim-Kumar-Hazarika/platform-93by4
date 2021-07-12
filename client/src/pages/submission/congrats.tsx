import { Center, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Layout } from '../../components'
import { CongratsCard } from '../../components'
import { fireworks } from '../../utils/fireworks'
import { useAuth } from '../../context/AuthContext'
import { Breadcrumbs } from './../../components/BreadCrumbs/BreadCrumbs'
import withAuth from '../../context/WithAuth'
import { useRouter } from 'next/router'

const Congrats: React.FC = () => {
  const { authState } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const userStatus = {
    submissionNo: authState?.user?.submissionData?.submissionNo,
    currentStatus: authState?.user?.submissionData?.currentStatus,
  }

  useEffect(() => {
    if (authState?.user?.submissionData?.currentStatus !== 'under review') {
      router.push('/submission/checklist')
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])
  useEffect(() => {
    if (authState?.user?.submissionData?.currentStatus === 'under review') {
      fireworks()
    }
  }, [])

  const breadcrumbsLinks = [
    { breadcrumbName: 'Dashboard', breadcrumbLink: '/dashboard' },
    {
      breadcrumbName: 'Congrats ',
      breadcrumbLink: '/submission/congrats',
    },
  ]
  return isLoading ? (
    <Center minH="100vh">
      <Spinner />
    </Center>
  ) : (
    <Layout>
      <Breadcrumbs breadcrumbProp={breadcrumbsLinks} />
      <CongratsCard {...userStatus} />
    </Layout>
  )
}

export default withAuth(Congrats)
