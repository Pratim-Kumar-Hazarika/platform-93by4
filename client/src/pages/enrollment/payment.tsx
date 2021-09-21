import { Layout } from '../../components'
import { Heading, Text } from '@chakra-ui/react'
import { theme } from '../../themes'
import { paymentStaticData } from '../../data/enrollment/paymentData'

const payment = () => {
  const breadcrumbsLinks = [
    { breadcrumbName: 'Dashboard', breadcrumbLink: '/dashboard' },
    {
      breadcrumbName: 'Payment Window',
      breadcrumbLink: '/enrollment/payment',
    },
  ]
  return (
    <Layout>
      <Heading
        as="h1"
        size="xl"
        color={theme.colors.brand['500']}
        fontFamily="Inter"
        pt="4"
      >
        {paymentStaticData.heading}
      </Heading>
      <Text
        size="lg"
        color={theme.colors.black['50']}
        fontFamily="Inter"
        pt="4"
      >
        {paymentStaticData.heading}
      </Text>
    </Layout>
  )
}

export default payment
