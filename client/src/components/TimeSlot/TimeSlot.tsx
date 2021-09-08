import { Button } from '@chakra-ui/react'

export function TimeSlot({
  from,
  to,
  isDisabled,
}: {
  from: string
  to: string
  isDisabled?: boolean
}) {
  return (
    <Button
      borderColor={isDisabled ? 'black.500' : 'brand.500'}
      color={isDisabled ? 'black.500' : 'brand.500'}
      _hover={{
        color: isDisabled ? 'black.600' : 'brand.600',
        borderColor: isDisabled ? 'black.600' : 'brand.600',
      }}
      variant="outline"
      rounded="md"
      size="lg"
      w="full"
      isDisabled={isDisabled}
    >
      {from} - {to}
    </Button>
  )
}
