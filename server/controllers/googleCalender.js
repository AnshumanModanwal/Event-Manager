const { google } = require('googleapis');
const oauth2Client = require('../config/calender').oauth2Client;

exports.createGoogleCalendarEvent = async (eventDetails) => {
  try {
    const event = {
      summary: eventDetails.title || 'No Title', // Ensure a fallback title
      description: eventDetails.description || '', // Optional
      start: {
        dateTime: new Date(eventDetails.startTime).toISOString(), // ISO format
        timeZone: 'Asia/Kolkata', // Required
      },
      end: {
        dateTime: new Date(eventDetails.endTime).toISOString(), // ISO format
        timeZone: 'Asia/Kolkata', // Required
      },
    };

    console.log('Event being sent to Google Calendar:', event);

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    return response.data; // Return Google Calendar event data
  } catch (error) {
    console.error('Error creating Google Calendar event:', error.response?.data || error.message);
    throw new Error('Failed to create Google Calendar event');
  }
};
