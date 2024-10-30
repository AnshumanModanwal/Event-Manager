const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title: {
    type: String, // Event title
    required: true,
  },
  description: {
    type: String, // Event description (optional)
  },
  startTime: {
    type: Date, // Start time of the event
    required: true,
  },
  endTime: {
    type: Date, // End time of the event
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Event", eventSchema);