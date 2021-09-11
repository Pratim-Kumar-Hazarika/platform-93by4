import { Box, Heading } from '@chakra-ui/react'
import { Layout, Breadcrumbs, Alert } from '../../components'
import { theme } from '../../themes'
import {
  uploadDocumentsAllFields,
  uploadDocumentsData,
} from '../../data/enrollment/uploadDocuments'
import { FormikForm } from '../../components'
import { CommentCard } from '../../components/Review/Cards'

const uploadDocuments = () => {
  const breadcrumbsLinks = [
    { breadcrumbName: 'Dashboard', breadcrumbLink: '/dashboard' },
    {
      breadcrumbName: 'Financial Aid Documents',
      breadcrumbLink: '/enrollment/faChecklist',
    },
    {
      breadcrumbName: 'upload-documents',
      breadcrumbLink: '/enrollment/upload-documents',
    },
  ]
  return (
    <Layout>
      <Breadcrumbs breadcrumbProp={breadcrumbsLinks} />
      <Heading
        as="h1"
        size="xl"
        color={theme.colors.brand['500']}
        fontFamily="Inter"
        pt="4"
      >
        {uploadDocumentsData.heading}
      </Heading>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        m="10"
        p="5"
        background={theme.colors.black['700']}
        border="none"
      >
        <Heading
          as="h1"
          size="xl"
          color={theme.colors.brand['500']}
          fontFamily="Inter"
          pt="4"
        >
          {uploadDocumentsData.documentRevisionHeading}
        </Heading>
        <CommentCard reviewComment="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." showAuthor={true} />

        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfeeHmhe-zOmFb4NbDHIishDcrG62IvRKSmFihu9Xl9Qu7WHA/viewform?embedded=true"
          width="100%"
          height="250px"
          frameBorder="0"
          marginHeight="0"
          marginwidth="0"
        >
          Loading…
        </iframe>

        <FormikForm fields={uploadDocumentsAllFields} />
      </Box>
    </Layout>
  )
}

export default uploadDocuments
