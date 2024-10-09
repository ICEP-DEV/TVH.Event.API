const express = require('express');
const router = express.Router();
const { createEvent, deleteEvent, getAllEvents,getEvent,getEventByUser,updateEvent,getEventByCategory} = require('../controllers/event.controller')

router.post('/create', createEvent)
router.get('/all', getAllEvents)
router.get('/category/:id', getEventByCategory)











module.exports = router;

