const User = require('../models/User');  // Adjust the path based on your project structure
const Event = require('../models/Event');
const { createGoogleCalendarEvent } = require('./googleCalender');
const { oauth2Client } = require('../config/calender'); // Import OAuth client

// Controller for scheduling an event
exports.scheduleEvent = async (req, res) => {
  const { user, formData, accessToken } = req.body; // Access token from frontend
  const { uid, email, displayName, photoURL, providerId } = user;
  const { title, description, startTime, endTime } = formData;

  console.log(accessToken,"acces1")
  try {
    // Find or create the user in MongoDB
    let existingUser = await User.findOne({ uid });
    if (!existingUser) {
      existingUser = await User.create({
        uid,
        email,
        displayName,
        photoURL,
        providerId,
      });
    }

    // Create the event in your database
    const newEvent = await Event.create({
      userId: existingUser._id,
      title: title,
      description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });

    // Sync event to Google Calendar
    oauth2Client.setCredentials({ access_token: accessToken }); // Set the user's token
    const calendarEvent = await createGoogleCalendarEvent({
      title: title,
      description: description,
      startTime: startTime,
      endTime: endTime,
    });

    return res.status(201).json({
      message: 'Event scheduled successfully',
      event: calendarEvent,
      localEvent: newEvent,
    });
  } catch (error) {
    console.error('Error scheduling event:', error);
    return res.status(500).json({ message: 'Error scheduling event', error });
  }
};
