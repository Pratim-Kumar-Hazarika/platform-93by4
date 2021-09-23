import { Table as ChakraTable, Tbody, Tr, Td, Th } from '@chakra-ui/react'
import { ITableData } from '../StudentInfoPanel/StudentInfoPanel'
export function Table({
  tableData,
  styles,
}: {
  tableData: ITableData
  styles: string
}): JSX.Element {
  console.log(tableData)
  return (
    <ChakraTable variant="simple" {...styles}>
      <Tbody>
        {tableData?.map((data: ITableData) => {
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
        })}
      </Tbody>
    </ChakraTable>
  )
}
