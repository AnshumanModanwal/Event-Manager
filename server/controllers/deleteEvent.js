const Event = require("../models/Event")
const User = require("../models/User")

exports.deleteEvent = async (req,res)=>{
    try {

        const { user,eventId } = req.body;


        if (!user || !eventId) {
            return res.status(400).json({ message: "User and eventId are required" });
          }

          const { uid } = user;

        const currentUser = await User.findOne({uid});

      

        if(!currentUser)
            { return res.status(400).json({message: "User not found"})}
       
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
          }


          return res.status(200).json({ message: "Event deleted successfully" });
        
    } catch (error) {
        console.error("Error deleting event:", error);
        return res.status(500).json({ message: "Server error" });
      }
}