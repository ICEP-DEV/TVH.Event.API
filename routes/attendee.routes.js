const express = require('express')
const router = express.Router();
const { updateDeviceID,getAttendeeEvents } = require('../controllers/attendee.controller')



router.post("/device", updateDeviceID)
router.get("/events/:attendee_id", getAttendeeEvents)


module.exports = router;
