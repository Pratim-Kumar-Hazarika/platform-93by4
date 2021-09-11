import { Flex, Input, Link, Button, Heading, Text } from '@chakra-ui/react'
import { Layout, Breadcrumbs, Alert } from '../../components'
import {
  fachecklist,
  fachecklistStaticData,
} from '../../data/enrollment/enrollment'
import { Card } from '../../components'
import { theme } from '../../themes'
import { useState } from 'react'

const faChecklist = () => {
  const [allMarksChecked, setAllMarksChecked] = useState<string[]>([])

  function checkAllIdsInArray() {
  
    return fachecklist.every((dataItem) =>
      allMarksChecked.includes(dataItem.id)
    )
  }

  const breadcrumbsLinks = [
    { breadcrumbName: 'Dashboard', breadcrumbLink: '/dashboard' },
    {
      breadcrumbName: 'Submit Portfolio ',
      breadcrumbLink: '/submission/questions',
    },
    {
      breadcrumbName: 'Financial Aid Documents',
      breadcrumbLink: '/enrollment/faChecklist',
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
        {fachecklistStaticData.heading}
      </Heading>
      <Text color={theme.colors.black['50']} fontSize="16px" pb="1rem">
        {fachecklistStaticData.discription}
      </Text>
      {fachecklist.map((mark) => {
        return (
          <Card
            key={`document-checklist-${mark.id}`}
            setAllMarksChecked={setAllMarksChecked}
            collapsible={true}
            {...mark}
          />
        )
      })}
      <Heading
        as="h1"
        size="xl"
        color={theme.colors.brand['500']}
        fontFamily="Inter"
        pt="3rem"
      >
        {fachecklistStaticData.noteTitle}
      </Heading>
      <Text color={theme.colors.black['50']} fontSize="16px" pb="1rem">
        {fachecklistStaticData.importantNote}
      </Text>
      <Text
        color={theme.colors.black['50']}
        fontSize="16px"
        pb="1rem"
        pt="-0.5rem"
      >
        {fachecklistStaticData.importantNote2}
      </Text>
          <Button
            colorscheme="brand.500"
            bg="black.900"
            size="md"
            variant="outline"
            _hover={{ bg: 'black.800' }}
            mt={['1rem', '0']}
            width={['100%', 'auto']}
          >
            Adarsh Balika zip folder
          </Button>
          <Button
            colorscheme="brand.500"
            bg="black.900"
            size="md"
            variant="outline"
            _hover={{ bg: 'black.800' }}
            mt={['1rem', '0']}
            ml={['0', '1rem']}
            width={['100%', 'auto']}
          >
            Affidavit Content
          </Button>
          <Flex mt="3rem" justifyContent='flex-end'>
          <Button
            background={theme.colors.brand['500']}
            color={theme.colors.black['900']}
            size="md"
            mt={['1rem', '0']}
            width={['100%', 'auto']}
            disabled={!checkAllIdsInArray()}
          >
          <Link href='/enrollment/upload-documents'>
            Next
          </Link>
          </Button>
          </Flex>
    </Layout>
  )
}

export default faChecklist
