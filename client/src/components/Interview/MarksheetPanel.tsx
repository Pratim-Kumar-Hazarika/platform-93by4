import { Heading } from '@chakra-ui/react'
import { theme } from '../../themes'
export const MarksheetPanel = () => {
  return (
    <>
      <Heading
        as="h1"
        size="xl"
        color={theme.colors.brand['500']}
        fontFamily="Inter"
        pt="4"
      >
        Marksheet
      </Heading>
    </>
  )
}
