import React from 'react'
import { Layout, Error } from '../components'

const Error404 = () => {
  return (
    <Layout title={'404 | neoG.camp'}>
      <Error
        path="/svgs/notFound.svg"
        message="Oops! The page you’re trying to reach doesn’t exist."
      />
    </Layout>
  )
}

export default Error404
