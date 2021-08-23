import React from 'react'
import { Card, Layout } from '../../components'
import { faqs } from '../../data/staticData/faqs'

function Faqs(): JSX.Element {
  return (
    <Layout>
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
