const { response } = require("express");
const db = require("../config/config");

// Add new feedback
exports.addFeedback = async (req, res) => {
  try {
    const { survey_id, registration_id, response, rating } = req.body;
    if (!survey_id || !registration_id || !response || !rating) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const query =
      "INSERT INTO feedback (survey_id, registration_id,responses,rating) VALUES (?, ?, ?, ?)";
    const [result] = await db.execute(query, [
      survey_id,
      registration_id,
      response,
      rating,
    ]);

    res
      .status(201)
      .json({ message: "Feedback created successfully", feedbackId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get all feedback for a specific event using the survey ID
exports.getFeedbackBySurvey = async (req, res) => {
    try {
      const { survey_id } = req.params;
      if (!survey_id) {
        return res.status(400).json({ error: "Survey ID is required" });
      }
  
      const query = "SELECT * FROM feedback WHERE survey_id = ?";
      const [feedbacks] = await db.execute(query, [survey_id]);
  
      if (feedbacks.length === 0) {
        return res.status(404).json({ message: "No feedback found for the survey" });
      }
  
      res.status(200).json(feedbacks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve feedback" });
    }
  };
  

exports.getFeedbackByEvent = async(req, res) => {
  const {event_id} = req.params;
  

  await db.execute(
    "SELECT f.* FROM feedback f " +
    "JOIN survey s on f.survey_id = s.survey_id " +
    "WHERE s.event_id = ?",
    [event_id]
  ).then((response) =>{
    res.status(200).json({results : response[0]})
  })
}
  

// Delete feedback by ID
exports.deleteFeedback = async (req, res) => {
    try {
      const { id } = req.params; 
      if (!id) {
        return res.status(400).json({ error: "Feedback ID is required" });
      }
  
      
      const query = "DELETE FROM feedback WHERE feedback_id = ?";
      const [result] = await db.execute(query, [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Feedback not found" });
      }
  
      res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete feedback" });
    }
  };
