import { Table as ChakraTable, Tbody, Tr, Td, Th } from '@chakra-ui/react'
export function Table({
  tableData,
  styles,
}: {
  tableData: [{
    id: string
    key: string
    value: string | number
  }]
  styles?: string
}): JSX.Element {
  console.log(tableData)
  return (
    <ChakraTable variant="simple" {...styles}>
      <Tbody>
        {tableData?.map(
          (data: { id: string; key: string; value: string | number }) => {
            return (
              <Tr key={data?.id}>
                <Th fontSize="md" color="black.50" outline="none" border="none">
                  {data?.key}:
                </Th>
                <Td outline="none" border="none" isNumeric>
                  {data?.value}
                </Td>
              </Tr>
            )
          }
        )}
      </Tbody>
    </ChakraTable>
  )
}
