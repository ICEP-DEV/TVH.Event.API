const express = require('express')
const router = express.Router();
const { createRegisterForm, getRegisterForm, submitRegister, checkRegistered, allRegistered,deleteRegisterForm, getRegistrationByAttendee } = require('../controllers/register.controller')



router.post('/create', createRegisterForm)
router.get('/get/attendee/:attendee_id', getRegistrationByAttendee)
router.get('/:event_id', getRegisterForm)
router.post('/submit', submitRegister)
router.post('/checkattendee', checkRegistered)
router.get('/attendee/:event_id', allRegistered)
router.delete('/form/:register_form_id',deleteRegisterForm)


module.exports = router;
