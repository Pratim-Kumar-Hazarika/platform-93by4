import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { useAdminAuth } from '../../context/AdminContext'
import { theme } from '../../themes'

const columns = [
  { Header: 'Portfolio ID', accessor: '_id' },
  { Header: 'Link', accessor: 'portfolioUrl' },
  { Header: 'Reviewed On', accessor: 'date' },
]

export function ReviewerHistory() {
  const { authState: adminAuthState } = useAdminAuth()

  const data =
    adminAuthState?.admin?.reviewHistory &&
    adminAuthState?.admin?.reviewHistory?.length > 0
      ? adminAuthState?.admin?.reviewHistory
      : []

  return (
    <Table
      bg={theme.colors.black['800']}
      mt="4"
      borderWidth="1px"
      fontSize="sm"
    >
      <Thead rounded="md" bg={theme.colors.black['700']}>
        <Tr>
          {columns.map((column, index) => {
            return (
              <Th whiteSpace="nowrap" scope="col" key={index}>
                {column.Header}
              </Th>
            )
          })}
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, index) => (
          <Tr key={index}>
            {columns.map((column, index) => {
              const cell = row[column.accessor as keyof typeof row] as string
              return (
                <Td whiteSpace="nowrap" key={index}>
                  {cell}
                </Td>
              )
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
