import { Button, IconButton, Flex } from '@chakra-ui/react'
import { AiOutlineDelete } from 'react-icons/ai'

export function TimeSlot({
  from,
  to,
  isDisabled,
  variant,
  deleteButton,
}: {
  from: string
  to: string
  variant: string
  isDisabled?: boolean
  deleteButton?: boolean
}) {
  return (
    <Flex align="center">
      <Button
        borderColor={
          variant == 'outline' && isDisabled ? 'black.500' : 'brand.500'
        }
        color={variant == 'outline' && isDisabled ? 'black.500' : 'brand.500'}
        _hover={{
          color: variant == 'outline' && isDisabled ? 'black.600' : 'brand.600',
          borderColor:
            variant == 'outline' && isDisabled ? 'black.600' : 'brand.600',
        }}
        variant={variant}
        rounded="md"
        size="lg"
        w="full"
        isDisabled={isDisabled}
      >
        {from} - {to}
      </Button>
      {deleteButton && (
        <IconButton
          size="md"
          rounded="md"
          variant="ghost"
          aria-label="delete-slot"
          ml="0.4rem"
        >
          <AiOutlineDelete fontSize="1.4rem" />
        </IconButton>
      )}
    </Flex>
  )
}
