const express = require('express')
const router = express.Router();
const { updateDeviceID, generateOtp, getAttendeeEvents, resetPassword, getAttendeeByEmail, updatePassword,signAttendeeRegister, endAttendeeRegister } = require('../controllers/attendee.controller')


router.post("/device", updateDeviceID)
router.get("/events/:attendee_id", getAttendeeEvents)
router.put("/password", updatePassword)
router.put("/events/:registration_id", signAttendeeRegister)
router.delete("/events/:registration_id", endAttendeeRegister)
router.get("/email/:email", getAttendeeByEmail)
router.get("/otp/:email", generateOtp)
router.put("/resetPassword/:email/:new_password", resetPassword)
module.exports = router;
