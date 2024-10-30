const Event = require("../models/Event")
const User = require("../models/User");

exports.updateEvent = async (req, res) => {
    try {
        const { user,eventId,formData } = req.body; 
        const { title, description, startTime, endTime } = formData;
        const { uid } = user; // Extract userId and updatedData from request body
        let existingUser = await User.findOne({ uid });
        
        if(!existingUser){
            return res.status(404).json({message:"User Not Found"})
        }
        // Check if event exists and belongs to the user
        const event = await Event.findOne({ _id: eventId, userId: existingUser._id });
        if (!event) {
            return res.status(404).json({ message: "Event not found or user does not have permission." });
        }

        // Update the event with provided data
        const updatedData = {
            title: title || event.title, // Keep current value if no new value is provided
            description: description || event.description,
            startTime: startTime || event.startTime,
            endTime: endTime || event.endTime,
        };
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { $set: updatedData },
            { new: true } // Returns the updated document
        );

        res.status(200).json({
            message: "Event updated successfully.",
            updatedEvent
        });
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({
            message: "An error occurred while updating the event.",
            error: error.message
        });
    }
};