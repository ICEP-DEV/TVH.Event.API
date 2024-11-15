const express = require('express');
const { getAllSurveys } = require('../controllers/survey.controller');
const router = express.Router();



router.get('/all', getAllSurveys)





module.exports = router;



