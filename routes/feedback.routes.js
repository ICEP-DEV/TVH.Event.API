const express = require("express");  
const { addFeedback, getFeedbackBySurvey, deleteFeedback, getFeedbackByEvent} = require("../controllers/feedback.controller");  

const router = express.Router(); 


router.post("/", addFeedback);  


router.get("/survey/:survey_id", getFeedbackBySurvey);


router.delete("/:id", deleteFeedback);  

router.get("/event/:event_id", getFeedbackByEvent)



module.exports = router;  