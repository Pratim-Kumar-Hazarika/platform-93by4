import { Button, IconButton, Flex } from '@chakra-ui/react'
import { AiOutlineDelete } from 'react-icons/ai'

export function TimeSlot({
  _id,
  from,
  to,
  isDisabled,
  variant,
  deleteButton,
  deleteHandler,
  onClick,
}: {
  _id?: string
  from: string
  to: string
  variant?: string
  isDisabled?: boolean
  onClick?: (soltId: string) => Promise<void>
  deleteButton?: boolean
  deleteHandler?: (slotId: string) => Promise<void>
}) {
  return (
    <Flex align="center">
      <Button
        borderColor={isDisabled ? 'black.500' : 'brand.500'}
        color={isDisabled ? 'black.500' : 'brand.500'}
        _hover={{
          color: isDisabled ? 'black.600' : 'brand.600',
          borderColor: isDisabled ? 'black.600' : 'brand.600',
        }}
        onClick={onClick && (() => _id && onClick(_id))}
        variant={variant || 'outline'}
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
          onClick={() => {
            if (deleteHandler && _id) {
              deleteHandler(_id)
            }
          }}
        >
          <AiOutlineDelete fontSize="1.4rem" />
        </IconButton>
      )}
    </Flex>
  )
}
