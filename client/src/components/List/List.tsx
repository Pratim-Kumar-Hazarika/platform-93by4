import { Box, IconButton, Link as ChakraLink, Stack } from '@chakra-ui/react'
import * as React from 'react'
import Link from 'next/link'
import { theme } from '../../themes'

interface LinkProps {
  icon: React.ReactElement
  title: string
  children?: React.ReactNode
  link?: string
  linkIcon?: React.ReactElement
  onClick?: () => void
  action?: string
}

export const List = (props: LinkProps) => {
  const { title, children, icon, link, linkIcon, onClick, action } = props
  return (
    <Stack
      px="6"
      py="6"
      direction={{ base: 'column', sm: 'row' }}
      spacing="5"
      justify="space-between"
      pos="relative"
      bg={theme.colors.black['800']}
      rounded="sm"
    >
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        spacing="4"
        align="flex-start"
        flex="1"
      >
        <Box aria-hidden fontSize="2xl" pt="1" color="gray.500">
          {icon}
        </Box>
        <Box flex="1">
          <Box as="h4" fontWeight="bold" maxW="xl">
            <span>{title}</span>
          </Box>
          <Box maxW={{ base: 'xs', md: 'unset' }} fontSize="sm">
            {children}
          </Box>
        </Box>
      </Stack>
      {!action
        ? link && (
            <Link href={link}>
              <IconButton
                variant="link"
                size="lg"
                icon={linkIcon}
                aria-label="External Link"
              ></IconButton>
            </Link>
          )
        : null}
      {action && (
        <IconButton
          onClick={onClick}
          variant="link"
          size="lg"
          icon={linkIcon}
          aria-label="External Link"
        ></IconButton>
      )}
    </Stack>
  )
}
