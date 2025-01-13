const express = require('express');
const { getAllSurveys, createSurvey, getSurvey,getAllSurveysForAttendee, getAttendeeSurvey } = require('../controllers/survey.controller');
const router = express.Router();



router.get('/all/:event_id', getAllSurveys)
router.post('/create', createSurvey)
router.get('/get/:survey_id', getSurvey)
router.get('/getallforattendee/:attendee_id', getAllSurveysForAttendee)
router.get('/getattendeesurvey/:attendee_id', getAttendeeSurvey)


module.exports = router;



