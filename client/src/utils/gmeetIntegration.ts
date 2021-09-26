declare global {
  interface Window {
    gapi: any
  }
}

export const scheduleGmeet = () => {
  try {
    const gapi = window.gapi

    console.log('Hii')

    return gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: process.env.API_KEY,
        clientId: process.env.CLIENT_ID,
        discoveryDocs: [process.env.DISCOVERY_DOCS],
        scope: process.env.SCOPES,
      })

      console.log('Hello')

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      return gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
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

          return request.execute((reqEvent: any) => {
            console.log({ reqEvent })
            return reqEvent
          })
          // .then((response: any) => {
          //   return response
          // })
          // console.log({ res })
          // return res
        })
    })
  } catch (error) {
    console.log({ error }, 'Error while create Google Meet Link')
  }
  // return { succeed: false }
}
