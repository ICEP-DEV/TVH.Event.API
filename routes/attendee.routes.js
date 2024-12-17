const express = require('express')
const router = express.Router();
const { updateDeviceID,getAttendeeEvents, updatePassword } = require('../controllers/attendee.controller')



router.post("/device", updateDeviceID)
router.get("/events/:attendee_id", getAttendeeEvents)
router.put("/password", updatePassword)


module.exports = router;
