import { Flex } from '@chakra-ui/react'
import { Calendar, Layout } from '../../components'
import { SEO } from '../../components/Layout/SEO'
import { SlotList } from '../../components/SlotList/SlotList'
import withAuth from '../../context/WithAuth'

function Schedule(): JSX.Element {
  return (
    <Layout>
      <SEO title="Schedule" />
      <Flex w="full" bg="black.800" p="2rem 2rem" rounded="lg">
        <Calendar />
        <SlotList />
      </Flex>
    </Layout>
  )
}

export default withAuth(Schedule)
