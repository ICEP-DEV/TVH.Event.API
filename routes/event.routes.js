const express = require('express');
const router = express.Router();
const { createEvent, deleteEvent, getAllEvents,getEvent,getEventByUser,updateEvent,getEventByCategory,getEventsForCalendar} = require('../controllers/event.controller')
const {authMiddleware} = require('../middleware/authMiddleware')

router.post('/create',authMiddleware, createEvent)
router.get('/all', getAllEvents)
router.get('/category/:id', getEventByCategory)
router.get('/calendar', getEventsForCalendar)
router.get('/:event_id', getEvent)
router.delete('/:id', authMiddleware, deleteEvent)
router.put('/:id',authMiddleware, updateEvent)
router.post('/fetchbyuser',authMiddleware, getEventByUser)












module.exports = router;

