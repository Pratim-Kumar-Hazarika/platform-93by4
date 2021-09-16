import { Heading, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { AiOutlineHistory } from 'react-icons/ai'
import { BsPerson } from 'react-icons/bs'
import { VscGlobe } from 'react-icons/vsc'
import { CommentCard, InfoCard } from './Cards'

interface PortfolioPanelProps {
  name: string
  portfolioLink: string
  reviewComments: Array<Record<string, string>>
  resubmissions: number
}

export function PortfolioPanel({
  name,
  portfolioLink,
  reviewComments,
  resubmissions,
}: PortfolioPanelProps) {
  return (
    <>
      <Stack direction={['column']} spacing={6}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
          <InfoCard
            icon={<BsPerson size="1.7rem" />}
            label="Name"
            value={<Text fontSize="lg">{name}</Text>}
          />
          <InfoCard
            icon={<VscGlobe size="1.7rem" />}
            label="Portfolio"
            value={
              <>
                <Text maxW={'70%'}>{portfolioLink}</Text>
              </>
            }
          />
          <InfoCard
            icon={<AiOutlineHistory size="1.7rem" />}
            label="Re-submissions"
            value={<Text fontSize="lg">{resubmissions}</Text>}
          />
        </SimpleGrid>

        <Stack direction={['column']} spacing={4}>
          <Heading px={{ base: 4, sm: 6 }} fontSize="lg">
            Previous Feedbacks
          </Heading>

          {reviewComments && reviewComments.length > 0 ? (
            reviewComments.map((review, idx) => {
              return (
                <CommentCard
                  key={idx}
                  author={review.author}
                  date={review.date}
                  reviewComment={review.comment}
                />
              )
            })
          ) : (
            <Text px={{ base: 4, sm: 6 }}>
              There are no previous feedbacks for this portfolio.
            </Text>
          )}
        </Stack>
      </Stack>
    </>
  )
}
