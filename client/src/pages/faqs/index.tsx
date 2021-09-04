import { Card, Layout } from '../../components'
import { faqHeading, faqs } from '../../data/staticData/faqs'
import { Heading } from '@chakra-ui/react'

function Faqs(): JSX.Element {
  return (
    <Layout>
      <Heading as="h1" size="lg" color="#00F0FF" fontFamily="Inter" textAlign="center">
        {faqHeading}
      </Heading>
      {faqs.map((faq, index) => {
        return (
          <Card
            id={index.toString()}
            key={faq.id}
            collapsible={true}
            centeredCardText={false}
            title={faq.question}
            projectName={faq.answer}
          />
        )
      })}
    </Layout>
  )
}

export default Faqs
