const express = require('express')
const router = express.Router();
const { updateDeviceID,getAttendeeEvents, updatePassword,signAttendeeRegister } = require('../controllers/attendee.controller')



router.post("/device", updateDeviceID)
router.get("/events/:attendee_id", getAttendeeEvents)
router.put("/password", updatePassword)
router.put("/events/:event_id", signAttendeeRegister)

module.exports = router;
