const express = require('express')
const router = express.Router();
const { createRegisterForm, getRegisterForm } = require('../controllers/register.controller')




router.post('/create', createRegisterForm)
router.get('/:event_id', getRegisterForm)



module.exports = router;
