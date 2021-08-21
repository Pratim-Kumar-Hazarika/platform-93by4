import { useEffect } from 'react'
import { Layout, Card, Breadcrumbs } from '../../components'
import { useAuth } from '../../context/AuthContext'
import withAuth from '../../context/WithAuth'
import router from 'next/router'
import { QuestionData } from '../../data/strings/questions'

export function QuestionsBeforeSubmission() {
  const { authState } = useAuth()
  const breadcrumbsLinks = [
    { breadcrumbName: 'Dashboard', breadcrumbLink: '/dashboard' },
    {
      breadcrumbName: 'Submit Portfolio ',
      breadcrumbLink: '/submission/questions',
    },
  ]
  useEffect(() => {
    if (authState?.user?.submissionData?.status === 'portfolio_under_review') {
      router.push('/dashboard')
    }
  }, [authState])
  return (
    <Layout>
      <Breadcrumbs breadcrumbProp={breadcrumbsLinks} />
      {QuestionData.map((question) => {
        return <Card key={question.id} {...question} />
      })}
    </Layout>
  )
}

export default withAuth(QuestionsBeforeSubmission)
