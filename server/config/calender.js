const { google } = require('googleapis');

const {CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI } = process.env
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI 
);

// This generates an auth URL for users to connect their Google Calendar
const generateAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
  });
};

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// Get the Access Token
const getAccessToken = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};



module.exports = { oauth2Client };
