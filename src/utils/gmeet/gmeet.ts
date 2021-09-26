import { nanoid } from 'nanoid'
import { google } from 'googleapis'
export async function meet(options: any) {
  const { OAuth2 } = google.auth
  const SCOPES = ['https://www.googleapis.com/auth/calendar']

  //upper part for api access

  const date1 = options.date + 'T' + options.time.split(':')[0] + ':00' + ':30'
  const date2 = options.date + 'T' + options.time.split(':')[0] + ':45' + ':30'

  const x = new Date(
    options.date + 'T' + options.time.split(':')[0] + ':00' + ':30'
  )
  const y = new Date(
    options.date + 'T' + options.time.split(':')[0] + ':45' + ':30'
  )

  const end1 =
    options.date +
    'T' +
    x.getUTCHours() +
    ':' +
    x.getUTCMinutes() +
    ':00' +
    '.000Z'
  const end2 =
    options.date +
    'T' +
    y.getUTCHours() +
    ':' +
    y.getUTCMinutes() +
    ':00' +
    '.000Z'

  //setting details for teacher
  const oAuth2Client = new OAuth2(options.clientId, options.clientSecret)

  oAuth2Client.setCredentials({
    refresh_token: options.refreshToken,
  })

  // Create a new calender instance.
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

  //checking whether teacher is budy or not
  const result = await calendar.events.list({
    calendarId: 'primary',
    timeMin: end1,
    timeMax: end2,
    maxResults: 1,
    singleEvents: true,
    orderBy: 'startTime',
  })

  const events = result.data.items
  if (events?.length) {
    console.log('you are busy for this time slot !')
    return null
  }

  //checking end

  // Create a new event start date instance for teacher in their calendar.
  const eventStartTime = options.eventStartTime
  eventStartTime.setDate(options.date.split('-')[2])
  const eventEndTime = new Date()
  eventEndTime.setDate(options.date.split('-')[2])
  eventEndTime.setMinutes(eventStartTime.getMinutes() + 30)

  // Create a dummy event for temp users in our calendar
  const event = {
    summary: options.summary,
    location: options.location,
    description: options.description,
    colorId: 1,
    conferenceData: {
      createRequest: {
        requestId: nanoid(),
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
      },
    },
    start: {
      dateTime: date1,
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: date2,
      timeZone: 'Asia/Kolkata',
    },
  }

  const link = await calendar.events.insert({
    calendarId: 'primary',
    calenderDataVersion: '1',
    resource: event,
  })
  return link?.data?.hangoutLink
}

module.exports.meet = meet
