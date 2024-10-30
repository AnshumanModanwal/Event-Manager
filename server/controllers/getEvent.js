const Event = require("../models/Event")
const User = require("../models/User");

exports.getEvents = async (req,res)=>{
try {
    const {user} = req.body;
    const {uid} = user


const currentUser = await User.findOne({uid})

    if(!currentUser)
        return res.status(400).json({message: "User not found"});

const events = await Event.find({userId:currentUser._id})


    console.log("events",events)
    res.status(200).json({events: events, message:"events found"})
    
} catch (error) {
    res.status(500).json({message:"Error fetching events"})
    
}
}