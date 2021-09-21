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
  Spinner,
} from '@chakra-ui/react'
import {
  Layout,
  Breadcrumbs,
  StudentInfoPanel,
  MarksheetPanel,
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
      <Heading
        as="h1"
        size="xl"
        color={theme.colors.brand['500']}
        fontFamily="Inter"
        pt="4"
      >
        Marksheet
      </Heading>
      <Text
        color={theme.colors.black['50']}
        fontSize="16px"
        noOfLines={5}
        pb="1rem"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, odio porro
        ea dicta adipisci omnis illo cum voluptatum, saepe, magni laboriosam.
        Nesciunt dignissimos ab dolorum ipsa nisi ipsum veniam ullam.
      </Text>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        m={['2rem 0', '2rem']}
        p="2rem"
        background={theme.colors.black['700']}
        border="none"
      >
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
              <MarksheetPanel />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  )
}

export default MarkSheet
