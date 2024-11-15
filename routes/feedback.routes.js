const express = require("express");  
const { addFeedback, getFeedbackBySurvey, deleteFeedback} = require("../controllers/feedback.controllers");  

const router = express.Router(); 


router.post("/", addFeedback);  


router.get("/survey/:survey_id", getFeedbackBySurvey);


router.delete("/:id", deleteFeedback);  



module.exports = router;  