const express = require("express");

const router = express.Router();


const {
    scheduleEvent
}  = require("../controllers/scheduleEvent")
const {
    getEvents
} =require ("../controllers/getEvent"
)

const {
    deleteEvent
}  = require("../controllers/deleteEvent");


const { updateEvent } = require("../controllers/updateEvent");
router.post("/schedule-event",scheduleEvent);
router.post("/show-events",getEvents)
router.post("/delete-event",deleteEvent)

router.put("/update-event",updateEvent)

module.exports = router;