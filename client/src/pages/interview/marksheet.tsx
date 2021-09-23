import {
  Flex,
  Input,
  Center,
  Box,
  Heading,
  useToast,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Stack,
} from '@chakra-ui/react'
import React from 'react'
import {
  Layout,
  Breadcrumbs,
  StudentInfoPanel,
  MarkSheetPanel,
} from '../../components'
import { theme } from '../../themes'

const MarkSheet = (): JSX.Element => {

  const breadcrumbsLinks = [
    { breadcrumbName: 'Dashboard', breadcrumbLink: '/dashboard' },
    {
      breadcrumbName: "Today's Interview",
      breadcrumbLink: '/dashboard',
    },
    { breadcrumbName: 'Marksheet', breadcrumbLink: '/interview/marksheet' },
  ]
  return (
    <Layout>
      <Breadcrumbs breadcrumbProp={breadcrumbsLinks} />
      <Stack spacing={4} direction={['column']}>
        <Heading
          as="h1"
          size="xl"
          color={theme.colors.brand['500']}
          fontFamily="Inter"
          mt="4"
        >
          Marksheet
        </Heading>
        <Text
          color={theme.colors.black['50']}
          fontSize="16px"
          noOfLines={5}
          pb="1rem"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, odio
          porro ea dicta adipisci omnis illo cum voluptatum, saepe, magni
          laboriosam. Nesciunt dignissimos ab dolorum ipsa nisi ipsum veniam
          ullam.
        </Text>
      </Stack>
      <Box bg={theme.colors.black['800']} mt={5} rounded={'sm'} pr={2} pl={2}>
        <Tabs isFitted variant="enclosed" colorScheme="brand">
          <TabList mb="1em">
            <Tab>Student Info</Tab>
            <Tab>Marksheet</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <StudentInfoPanel />
            </TabPanel>
            <TabPanel>
              <MarkSheetPanel />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  )
}

export default MarkSheet
