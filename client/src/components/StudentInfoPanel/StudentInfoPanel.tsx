import { Heading, Flex, Link, Stack ,Box} from '@chakra-ui/react'
import { theme } from '../../themes'
import { Table } from '..'

export const StudentInfoPanel = () => {
  const tableData = [
    {
      id: '1',
      key: 'Year of graduation',
      value: '2022',
    },
    {
      id: '2',
      key: 'Professional Status',
      value: 'Student',
    },
  ]
  const tableData2 = [
    {
      id: '1',
      key: 'Educational Background',
      value: 'Computer',
    },
    {
      id: '2',
      key: 'FA Student',
      value: 'No',
    },
  ]
  return (
    <>
      <Stack pl={2} pr={2}>
        <Heading
          as="h2"
          fontSize="2xl"
          color={theme.colors.brand['500']}
          fontFamily="Inter"
          pt="4"
        >
          Meeting link:{' '}
          <Link href="https://meet.google.com/fti-bdvz-hqz" isExternal>
            https://meet.google.com/fti-bdvz-hqz
          </Link>
        </Heading>
        <Heading size="md" pt="4" color={theme.colors.black['50']}>
          Name:
        </Heading>
        <Heading size="md" pt="2" color={theme.colors.black['50']}>
          Portfolio Link:
        </Heading>
      </Stack>
      <Heading
        as="h2"
        fontSize="2xl"
        color={theme.colors.brand['500']}
        fontFamily="Inter"
        pt="6"
      >
        More Details
      </Heading>
      <Flex>
    
          <Box flex="1" color="white">
          <Table tableData={tableData} />
        {/* <Box width='2px' bg='black.400' justifySelf='center'/> */}
          </Box>
        <Box flex="1" color="white">
        <Table
          tableData={tableData2}
          styles={{ borderLeft: '1px solid gray' }}
        />
   </Box>
      </Flex>
    </>
  )
}
