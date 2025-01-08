const express = require('express')
const router = express.Router();
const { updateDeviceID,getAttendeeEvents, updatePassword,signAttendeeRegister, endAttendeeRegister } = require('../controllers/attendee.controller')



router.post("/device", updateDeviceID)
router.get("/events/:attendee_id", getAttendeeEvents)
router.put("/password", updatePassword)
router.put("/events/:registration_id", signAttendeeRegister)
router.delete("/events/:registration_id", endAttendeeRegister)

module.exports = router;
