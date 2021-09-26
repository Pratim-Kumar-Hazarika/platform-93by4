declare global {
  interface Window {
    gapi: any
  }
}

export const authenticate = async () => {
  const { gapi } = window
  try {
    // await gapi.auth2.init({ clientId })
    await gapi.client.init({
      apiKey: process.env.API_KEY,
      clientId: process.env.CLIENT_ID,
      discoveryDocs: [process.env.DISCOVERY_DOCS],
      scope: process.env.SCOPES,
    })
    console.log('authenticated')
  } catch (error) {
    throw Error(`Error authenticating gapi client: ${error}`)
  }
}

export const loadYoutubeApi = async () => {
  const { gapi } = window
  try {
    await gapi.client.load('calendar', 'v3', () => console.log('bam!'))
    console.log('youtube api loaded')
  } catch (error) {
    throw Error(`Error loading youtube gapi client: ${error}`)
  }
}

export const initialize = async () => {
  const { gapi } = window
  const isInitialized = await gapi.load('client:auth2', async () => {
    try {
      await authenticate()
      await loadYoutubeApi()
      return true
    } catch (error) {
      throw Error(`Error initializing gapi client: ${error}`)
    }
  })
  console.log(isInitialized) // expects `true` but am getting `undefined`
}

// initialize()

// export const scheduleGmeet = async () => {
//   try {
//     const gapi = window.gapi

//     console.log('Hii')

//     // try {
//     //   await new Promise((resolve, reject) => {
//     //     gapi.load('client:auth2', resolve)
//     //   })
//     //   // await authenticate()
//     //   // await loadYoutubeApi()
//     // } catch (error) {
//     //   throw Error(`Error initializing gapi client: ${error}`)
//     // }

//     return await gapi.load('client:auth2', async () => {
//       gapi.client.init({
//         apiKey: process.env.API_KEY,
//         clientId: process.env.CLIENT_ID,
//         // discoveryDocs: [process.env.DISCOVERY_DOCS],
//         scope: process.env.SCOPES,
//       })

//       console.log('Hello')

//       gapi.client.load('calendar', 'v3', () => console.log('bam!'))

//       return await gapi.auth2
//         .getAuthInstance()
//         .signIn()
//         .then(async () => {
//           const event = {
//             summary: 'Awesome Event 3!',
//             location: 'Mumbai, India',
//             description: 'Really great refreshments',
//             start: {
//               dateTime: '2021-09-30T09:00:00-07:00',
//               timeZone: 'America/Los_Angeles',
//             },
//             end: {
//               dateTime: '2021-09-30T17:00:00-07:00',
//               timeZone: 'America/Los_Angeles',
//             },
//             recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
//             attendees: [
//               { email: 'snehalnawar8263@gmail.com' },
//               { email: 'prerananawar1@gmail.com' },
//               { email: 'prerananw1@gmail.com' },
//             ],
//             conferenceData: {
//               createRequest: {
//                 requestId: 'zzz',
//                 conferenceSolutionKey: {
//                   type: 'hangoutsMeet',
//                 },
//               },
//             },
//             reminders: {
//               useDefault: false,
//               overrides: [
//                 { method: 'email', minutes: 24 * 60 },
//                 { method: 'popup', minutes: 10 },
//               ],
//             },
//           }

//           const request = gapi.client.calendar?.events.insert({
//             calendarId: 'primary',
//             resource: event,
//             conferenceDataVersion: '1',
//           })

//           return await request.execute((reqEvent: any) => {
//             console.log({ reqEvent })
//             return reqEvent
//           })
//           // .then((response: any) => {
//           //   return response
//           // })
//           // console.log({ res })
//           // return res
//         })
//     })
//   } catch (error) {
//     console.log({ error }, 'Error while create Google Meet Link')
//   }
//   // return { succeed: false }
// }
