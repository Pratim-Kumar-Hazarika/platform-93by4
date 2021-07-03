import { Flex, Input, Button, Box, Heading, Text } from '@chakra-ui/react'
import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { Layout } from '../../components'
import { useRouter } from 'next/router'

const SubmissionWindow: React.FC = () => {
  const [disableButton, setDisabledButton] = useState<boolean>(true)
  const inputRef = useRef<any>()
  const [output, setOutput] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  function isUrlValid(portfolioUrl: string): boolean {
    // eslint-disable-next-line no-useless-escape
    const urlRegex =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    const res = portfolioUrl.match(urlRegex)
    return res !== null
  }

  function checkPortfolioUrl() {
    if (isUrlValid(inputRef.current.value)) {
      setDisabledButton(false)
    } else {
      setDisabledButton(true)
    }
  }

  const submitPortfolioUrl = async () => {
    try {
      const response = await axios.post('http://localhost:3001/', {
        portfolioUrl: inputRef.current.value,
      })
      console.log(response)

      if (response.status === 202) {
        router.push('./congrats-card')
      } else {
        setOutput(
          'Portfolio URL already exists, try again with your own URL'
        )
      }
      console.log(response.data)
      return response.data
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      <Layout>
        <Heading as="h1" size="xl" color="#00F0FF" fontFamily="Inter">
          Congrats, your portfolio is ready to submit!
        </Heading>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          colorScheme="black.200"
          m="10"
          p="5"
          background="black.800"
          border="none"
        >
          <Flex flexDirection="column">
            <Flex>
              <Heading as="h2" size="md" p="2" ml="2" color="white">
                Submit your portfolio for review:
              </Heading>
            </Flex>
            <Flex justifyContent="center" alignItems="center" p="5">
              <Input
                placeholder="https://adarshbalika.netlify.app"
                onChange={checkPortfolioUrl}
                ref={inputRef}
                border="none"
                background="black.600"
                width="auto"
                color="black.100"
              />
              <Button
                ml="10"
                colorScheme="brand"
                isDisabled={disableButton}
                onClick={submitPortfolioUrl}
                color="#151515"
              >
                Submit
              </Button>
            </Flex>
            <Text color="red" alignSelf="center">
              {output}
            </Text>
          </Flex>
        </Box>
      </Layout>
    </>
  )
}

export default SubmissionWindow
