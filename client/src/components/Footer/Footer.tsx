import {
  Box,
  IconButton,
  ButtonGroup,
  Text,
  HStack,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react'

import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaDiscord,
  FaYoutube,
  FaTelegram,
} from 'react-icons/fa'

import { legalLinks, socialLinks } from './footerLinks'

export function Footer() {
  return (
    <>
      <Box>
        <ButtonGroup variant="ghost" color="gray.600" mt={4}>
          {socialLinks.map(({ id, label, href, icon }) => {
            return (
              <IconButton
                as="a"
                href={href}
                aria-label={label}
                icon={icon}
                key={id}
                target="_blank"
              />
            )
          })}
        </ButtonGroup>
      </Box>
      <Flex direction="column" mt={{ base: '12', md: '5' }}>
        <Text fontSize="sm" color="black.00">
          &copy; {new Date().getFullYear()} neoG.camp. All rights reserved
        </Text>
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={{ base: '3', md: '1' }}
          mt={{ base: '12', md: '5' }}
        >
          {legalLinks.map(({ id, label, href }) => {
            return (
              <Text
                fontSize="xs"
                color="black.500"
                colSpan={1}
                rowSpan={1}
                key={id}
              >
                <a href={href} target="_blank">
                  {label}
                </a>
              </Text>
            )
          })}
        </Grid>
      </Flex>
    </>
  )
}
