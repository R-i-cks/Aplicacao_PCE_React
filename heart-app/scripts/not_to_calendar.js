const { google } = require('googleapis');
const path = require('path');
const { authenticate } = require('@google-cloud/local-auth');
const EventEmitter = require('events').EventEmitter;

const calendar = google.calendar('v3');

async function EventToCalendar(data, descricao, auth) {
  const startDate = new Date(data);

  // Calculate end of event = +10 min
  const endDate = new Date(startDate.getTime() + 10 * 60 * 1000);

  function toISOStringWithZ(date) {
    return date.toISOString().replace('.000', '');
  }

  const formattedStart = toISOStringWithZ(startDate);
  const formattedEnd = toISOStringWithZ(endDate);

  const event = {
    summary: 'Measure your blood pressure',
    description: descricao,
    start: {
      dateTime: formattedStart,
      timeZone: 'UTC'
    },
    end: {
      dateTime: formattedEnd,
      timeZone: 'UTC'
    }
  };

  try {
    const response = await calendar.events.insert({
      auth: auth,
      calendarId: 'primary',
      resource: event,
    });
    console.log('Event created: %s', response.data.htmlLink);
  } catch (error) {
    console.error('Error creating event: ', error);
  }
}

async function auth_and_send_notif(data, msg) {
  try {
    const auth = await authenticate({
      keyfilePath: path.join(__dirname, '../../chave_c.json'),
      scopes: [
        'https://www.googleapis.com/auth/calendar',
      ],
    });
    await EventToCalendar(data, msg, auth);
  } catch (error) {
    console.error('Error during authentication: ', error);
  }
}

module.exports = { EventToCalendar, auth_and_send_notif };