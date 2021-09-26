import { Flex, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import router from 'next/router'
import { Calendar, Layout } from '../../components'
import { SlotList, SEO } from '../../components'
import { useAuth } from '../../context/AuthContext'
import useIntervieweeDetails from '../../context/IntervieweeContext'
import { ISlot } from '../../context/InterviewerContext'
import withAuth from '../../context/WithAuth'
import { bookInterviewSlot } from '../../services/axiosService'

const removeSecs = (time: string): string => {
  const temp = new Date(time).toLocaleString().split(' ')
  const t1 = temp[1].split(':').slice(0, 2).join(':')
  temp[1] = t1
  return temp.join(' ')
}

function Schedule(): JSX.Element {
  const { intervieweeState, intervieweeDispatch } = useIntervieweeDetails()
  const toast = useToast()
  const { authState } = useAuth()
  useEffect(() => {
    if (!Boolean(intervieweeState?.bookedSlots?.length)) {
      router.push('/interviewee/scheduled')
    }
  }, [intervieweeState])
  const slotClickHandler = async (slotId: string) => {
    try {
      const response = await bookInterviewSlot(slotId)
      if (response.status === 200) {
        intervieweeDispatch({
          type: 'UPDATE_SLOT',
          payload: {
            ...response.data?.slot,
          },
        })
        intervieweeDispatch({
          type: 'ADD_SCHEDULED_SLOT',
          payload: {
            ...response.data?.slot,
          },
        })
        toast({
          title: 'Success',
          description: 'Interview booked successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        router.push('/interviewee/scheduled')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const updatedSlots = (intervieweeState?.slots || [])?.reduce(
    (acc: Array<ISlot>, val: ISlot) => {
      console.log(
        val.status !== 'open',
        acc.some((slot: ISlot) => {
          const t1 = removeSecs(slot?.from)
          const t2 = removeSecs(val?.from)
          return t1 === t2
        })
      )
      if (
        val.status !== 'open' ||
        acc.some((slot: ISlot) => {
          const t1 = removeSecs(slot?.from)
          const t2 = removeSecs(val?.from)
          return t1 === t2
        })
      ) {
        return acc
      }
      return [...acc, val]
    },
    []
  )
  console.log(
    authState?.isLoading,
    !Boolean(intervieweeState?.bookedSlots),
    !Boolean(intervieweeState?.slots),
    intervieweeState
  )
  return (
    <Layout
      loading={
        authState?.isLoading ||
        !Boolean(intervieweeState?.bookedSlots) ||
        !Boolean(intervieweeState?.slots)
      }
    >
      <SEO title="Schedule" />
      <Flex w="full" bg="black.800" p="2rem 2rem" rounded="lg">
        <Calendar />
        <SlotList
          interviewSlots={updatedSlots || []}
          title="Pick Slot"
          key={`pick-slot-list-${updatedSlots?.length}`}
          slotClickHandler={slotClickHandler}
          addTimeInputVisibility={false}
          deleteButton={false}
        />
      </Flex>
    </Layout>
  )
}

export default withAuth(Schedule)
