const express = require('express')
const router = express.Router();
const { createRegisterForm, getRegisterForm, submitRegister, checkRegistered, allRegistered } = require('../controllers/register.controller')




router.post('/create', createRegisterForm)
router.get('/:event_id', getRegisterForm)
router.post('/submit', submitRegister)
router.post('/checkattendee', checkRegistered)
router.get('/', allRegistered)


module.exports = router;
