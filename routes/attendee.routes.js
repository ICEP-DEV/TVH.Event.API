const express = require('express')
const router = express.Router();
const { updateDeviceID } = require('../controllers/attendee.controller')



router.post("/device", updateDeviceID)




module.exports = router;
