import { Heading, Box, Link, Button } from '@chakra-ui/react'
import {
  uploadDocumentsData,
  uploadDocumentsAllFields,
} from '../../data/enrollment/uploadDocuments'
import { theme } from '../../themes'
import { CommentCard } from '../Review/Cards'
import { Layout } from '../index'
import { FormikForm } from '../index'
import { Breadcrumbs } from '../index'
export const UploadDocument = ({
  comment = false,
  reviewComment,
}: {
  comment: boolean
  reviewComment?: string
}) => {
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
          pb="4"
        >
          {uploadDocumentsData.documentRevisionHeading}
        </Heading>
        {comment && (
          <CommentCard reviewComment="{reviewComment}" showAuthor={true} />
        )}
        <Button background={theme.colors.brand['500']} alignItems="center">
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSfeeHmhe-zOmFb4NbDHIishDcrG62IvRKSmFihu9Xl9Qu7WHA/viewform?embedded=true"
            isExternal
          >
            Upload documents here!
          </Link>
        </Button>

        <FormikForm fields={uploadDocumentsAllFields} />
      </Box>
    </Layout>
  )
}
