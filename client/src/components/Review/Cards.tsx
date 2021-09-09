import { Badge, Box, HStack, Stack, Text } from '@chakra-ui/react'
import { BsPerson } from 'react-icons/bs'
import { theme } from '../../themes'

interface InfoCardProps {
  icon: React.ReactElement
  label: string
  /** Pass `<Text>Value</Text>` or `<ChakraLink>Value</ChakraLink>` */
  value: React.ReactElement
}

export function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <HStack
      bg={theme.colors.black['700']}
      px={{ base: 4, sm: 6 }}
      py="5"
      border="1px"
      borderColor={theme.colors.black['600']}
      borderRadius="md"
      spacing={4}
    >
      <Box bg={theme.colors.black['600']} borderRadius="50%" p="0.4rem">
        {icon}
      </Box>
      <Box>
        <Text fontWeight="medium" isTruncated fontSize="sm">
          {label}
        </Text>
        {value}
      </Box>
    </HStack>
  )
}

interface CommentCardProps {
  reviewComment: string
  author?: string
  date?: string
  showAuthor?:boolean
}

export function CommentCard({ reviewComment, author, date, showAuthor=true }: CommentCardProps) {
  return (
    <Box
      bg={theme.colors.black['700']}
      px={{ base: 4, sm: 6 }}
      py="5"
      border="1px"
      borderColor={theme.colors.black['600']}
      rounded="md"
    >
      <Text fontSize="lg">{reviewComment}</Text>
      {showAuthor && <Stack direction={['row']} spacing={3} alignItems="center" mt={4}>
        <Box bg={theme.colors.black['600']} borderRadius="50%" p="0.4rem">
          <BsPerson size="1.7rem" />
        </Box>
        <Box>
          <Text fontSize="sm">{author}</Text>
          <Badge fontSize="xs">Reviewer</Badge>
          <Text fontSize="xs">on {new Date(date).toDateString()}</Text>
        </Box>
      </Stack>}
    </Box>
  )
}
