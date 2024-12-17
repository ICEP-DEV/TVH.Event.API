const express = require('express')
const router = express.Router();
const { createRegisterForm, getRegisterForm, submitRegister, checkRegistered, allRegistered,deleteRegisterForm, getRegistrationByAttendee, fetchAllEventsForAttendee } = require('../controllers/register.controller')


//GET
router.get('/get/attendee/:attendee_id', getRegistrationByAttendee)
router.get('/:event_id', getRegisterForm)
router.get('/attendee/:event_id', allRegistered)
router.get('/attendee/all/:attendee_id', fetchAllEventsForAttendee)

//POST
router.post('/create', createRegisterForm)
router.post('/submit', submitRegister)
router.post('/checkattendee', checkRegistered)


//Delete
router.delete('/form/:register_form_id',deleteRegisterForm)

module.exports = router;
