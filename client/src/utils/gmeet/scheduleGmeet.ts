import router from 'next/router'
import { Dispatch } from 'react'
import { IntervieweeAction } from '../../context/IntervieweeContext'
import { bookInterviewSlot } from '../../services/axiosService'

declare global {
  interface Window {
    gapi: any
  }
}

export async function scheduleGmeet({
  intervieweeDispatch,
  slotId,
  toast,
}: {
  intervieweeDispatch: Dispatch<IntervieweeAction>
  slotId: string
  toast: any
}) {
  try {
    const gapi = window.gapi

    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: process.env.API_KEY,
        clientId: process.env.CLIENT_ID,
        // discoveryDocs: [process.env.DISCOVERY_DOCS],
        scope: process.env.SCOPES,
      })

      console.log('gapi.client.init', {
        apiKey: process.env.API_KEY,
        clientId: process.env.CLIENT_ID,
        // discoveryDocs: [process.env.DISCOVERY_DOCS],
        scope: process.env.SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(async () => {
          const event = {
            summary: 'Awesome Event 3!',
            location: 'Mumbai, India',
            description: 'Really great refreshments',
            start: {
              dateTime: '2021-09-30T09:00:00-07:00',
              timeZone: 'America/Los_Angeles',
            },
            end: {
              dateTime: '2021-09-30T17:00:00-07:00',
              timeZone: 'America/Los_Angeles',
            },
            recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
            attendees: [
              { email: 'snehalnawar8263@gmail.com' },
              { email: 'prerananawar1@gmail.com' },
              { email: 'prerananw1@gmail.com' },
            ],
            conferenceData: {
              createRequest: {
                requestId: 'zzz',
                conferenceSolutionKey: {
                  type: 'hangoutsMeet',
                },
              },
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
              ],
            },
          }

          const request = gapi.client.calendar?.events.insert({
            calendarId: 'primary',
            resource: event,
            conferenceDataVersion: '1',
          })

          await request.execute(async (reqEvent: any) => {
            const gmeetLink = reqEvent.hangoutLink
            const response = await bookInterviewSlot(slotId, gmeetLink)
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
                  gmeetLink,
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
            return reqEvent
          })
        })
    })
  } catch (error) {
    console.log({ error }, 'Error while create Google Meet Link')
  }
  return { succeed: false }
}
