const express = require('express');
const { getAllSurveys, createSurvey, getSurvey } = require('../controllers/survey.controller');
const router = express.Router();



router.get('/all/:event_id', getAllSurveys)
router.post('/create', createSurvey)
router.get('/get/:survey_id', getSurvey)


module.exports = router;



