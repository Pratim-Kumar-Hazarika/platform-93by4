import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

export const TableCardWrapper = (props: BoxProps) => (
  <Box
    bg="black.800"
    rounded={{ md: 'lg' }}
    shadow="base"
    overflow="hidden"
    {...props}
  />
)
