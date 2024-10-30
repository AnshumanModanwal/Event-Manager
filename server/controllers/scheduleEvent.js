// controllers/eventController.js

const User = require('../models/User');  // Adjust the path based on your project structure
const Event = require('../models/Event');

// Controller for scheduling an event
exports.scheduleEvent = async (req, res) => {
    
  const { user, formData } = req.body;
  console.log(user)
  const { uid, email, displayName, photoURL, providerId } = user;
  const { title, description, startTime, endTime } = formData;

  try {
    // Find or create the user
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

    // Create the event associated with the user
    const newEvent = await Event.create({
      userId: existingUser._id,
      title: title,
      description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });

    

    return res.status(201).json({ message: 'Event scheduled successfully', event: newEvent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error scheduling event', error });
  }
};