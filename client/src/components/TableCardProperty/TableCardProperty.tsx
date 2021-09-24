import { Box, Flex, FlexProps, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

interface Props extends FlexProps {
  label: string
  value: string
}

export const TableCardProperty = (props: Props) => {
  const { label, value, ...flexProps } = props
  return (
    <Flex
      as="dl"
      direction={{ base: 'column', sm: 'row' }}
      px="6"
      py="4"
      _even={{ bg: 'black.700' }}
      {...flexProps}
    >
      <Box as="dt" minWidth="180px" fontWeight="bold" color="black.200">
        {label}
      </Box>
      <Box as="dd" flex="1" color="white">
        {value}
      </Box>
    </Flex>
  )
}
