import { Box, Button, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
import { HiPencilAlt } from 'react-icons/hi'
import {
  TableCardContent,
  TableCardHeader,
  TableCardProperty,
  TableCardWrapper,
} from '..'

export const TableCard = ({
  title,
  btnText,
  onClickHandler,
  properties,
}: {
  title: string
  btnText: string
  onClickHandler: () => Promise<void>
  properties: Array<{
    label: string
    value: string
  }>
}) => (
  <Box as="section" bg="black.900" py="12" px={{ md: '8' }}>
    <TableCardWrapper maxW="3xl" mx="auto">
      <TableCardHeader
        title={title}
        action={
          <Button colorScheme="brand" minW="20" onClick={onClickHandler}>
            {btnText}
          </Button>
        }
      />
      <TableCardContent>
        {properties &&
          properties?.map(({ label, value }) => {
            return (
              <TableCardProperty
                key={`table-card-property-${label}`}
                label={label}
                value={value}
              />
            )
          })}
      </TableCardContent>
    </TableCardWrapper>
  </Box>
)
