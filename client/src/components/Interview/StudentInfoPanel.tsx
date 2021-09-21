import { Heading, Flex, Spacer, Link } from '@chakra-ui/react'
import { theme } from '../../themes'
import { CommentCard } from '../Review/Cards'
export const StudentInfoPanel = () => {
  return (
    <>
      <Heading
        as="h1"
        size="lg"
        color={theme.colors.brand['500']}
        fontFamily="Inter"
        pt="4"
      >
        Meeting link: <Link href='https://meet.google.com/fti-bdvz-hqz' isExternal>https://meet.google.com/fti-bdvz-hqz</Link>
      </Heading>
      <Heading size="md" pt="4" color={theme.colors.black['50']}>
        Name:
      </Heading>
      <Heading size="md" pt="2" color={theme.colors.black['50']}>
        Portfolio Link:
      </Heading>
      <Heading
        as="h2"
        size="lg"
        color={theme.colors.brand['500']}
        fontFamily="Inter"
        pt="6"
      >
        More Details
      </Heading>
      <Flex>
        <Flex flexDirection="column">
          <Heading size="md" pt="2" color={theme.colors.black['50']}>
            Year of graduation: 2022
          </Heading>
          <Heading size="md" pt="2" color={theme.colors.black['50']}>
            Professional Status: Student
          </Heading>
        </Flex>
        <Spacer />
        <Flex flexDirection="column">
          <Heading size="md" pt="2" color={theme.colors.black['50']}>
            Educational Background: Computer
          </Heading>
          <Heading size="md" pt="2" color={theme.colors.black['50']}>
            FA Student: No
          </Heading>
        </Flex>
      </Flex>
    </>
  )
}
