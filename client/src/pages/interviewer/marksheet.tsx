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
    Stack
} from '@chakra-ui/react'
import React from 'react'
import {Layout, Breadcrumbs, StudentInfoPanel, MarkSheetPanel} from '../../components'
import {SEO} from '../../components/Layout/SEO'
import {theme} from '../../themes'

const MarkSheet = () : JSX.Element => {
    const breadcrumbsLinks = [
        {
            breadcrumbName: 'Dashboard',
            breadcrumbLink: '/dashboard'
        }, {
            breadcrumbName: "Today's Interview",
            breadcrumbLink: '/dashboard'
        }, {
            breadcrumbName: 'Marksheet',
            breadcrumbLink: '/interview/marksheet'
        }
    ];
    return (
        <Layout>
        <SEO title="Marksheet"/>
        <Stack spacing={4} direction={['column']}>
            <Breadcrumbs breadcrumbProp={breadcrumbsLinks}/>
            <Heading pt="0.5rem" color="brand.500">
                Marksheet
            </Heading>
            <Text pb="2rem">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, odio porro ea
                dicta adipisci omnis illo cum voluptatum, saepe, magni laboriosam. Nesciunt
                dignissimos ab dolorum ipsa nisi ipsum veniam ullam.
            </Text>
        </Stack>
        <Box>
            <Flex w="full" bg="black.800" p="2rem 2rem" rounded="lg">
                <Tabs isFitted //</Flex> variant="enclosed"
                    colorScheme="brand" width="100%">
                    <TabList mb="1em">
                        <Tab>Student Info</Tab>
                        <Tab>Marksheet</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <StudentInfoPanel/>
                        </TabPanel>
                        <TabPanel>
                          <MarkSheetPanel/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Box> 
      </Layout>
  )
}

export default MarkSheet