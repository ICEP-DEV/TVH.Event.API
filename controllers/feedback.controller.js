const { response } = require("express");
const db = require("../config/config");

// Add new feedback
exports.addFeedback = async (req, res) => {
  try {
    const { survey_id, response, attendee_id, event_id } = req.body;

    if (!survey_id || !response || !attendee_id || !event_id) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Query to get the registration_id
    const registrationQuery = `
      SELECT r.registration_id 
      FROM registration r
      JOIN registration_form f ON r.registration_form_id = f.registration_form_id
      WHERE r.attendee_id = ? AND f.event_id = ?
    `;

    const [registrationResult] = await db.execute(registrationQuery, [
      attendee_id,
      event_id,
    ]);

    if (registrationResult.length === 0) {
      HTMLFormControlsCollection.log
      return res
        .status(404)
        .json({ error: "Registration not found for the given attendee and event" });
    }

    const registration_id = registrationResult[0].registration_id;

    // Query to insert feedback
    const insertFeedbackQuery = `
      INSERT INTO survey_feedback (survey_id, registration_id, responses) 
      VALUES (?, ?, ?)
    `;

    const [result] = await db.execute(insertFeedbackQuery, [
      survey_id,
      registration_id,
      response,
    ]);

    res.status(201).json({
      message: "Feedback created successfully",
      feedbackId: result.insertId,
    });
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
  
      const query = "SELECT * FROM survey_feedback WHERE survey_id = ?";
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
  

exports.getFeedbackByEvent = async(req, res) => { // Fetch 
  const {event_id} = req.params;
  

  await db.execute(
    "SELECT f.feedback_id, f.responses,f.submitted, s.questions, a.first_name, a.last_name, a.gender " +
    "FROM survey_feedback f " +
    "JOIN survey s on f.survey_id = s.survey_id " +
    "JOIN registration r on f.registration_id = r.registration_id " +
    "JOIN attendee a on r.attendee_id = a.attendee_id " +
    "WHERE s.event_id = ?",
    [event_id]
  ).then((response) =>{
    res.status(200).json({results : response[0]})
  }).catch((error) =>{
    console.log(error)
    res.status(500).json({message : error.message})
  })
}
  

// Delete feedback by ID
exports.deleteFeedback = async (req, res) => {
    try {
      const { id } = req.params; 
      if (!id) {
        return res.status(400).json({ error: "Feedback ID is required" });
      }
  
      
      const query = "DELETE FROM survey_feedback WHERE feedback_id = ?";
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
