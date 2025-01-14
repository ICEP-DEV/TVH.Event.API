const db = require("../config/config");

// CREATING A NOTIFICATION
exports.addNotification = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

    // Destructure fields from the request body, including event_id
    const { notification_id, attendee_id, admin_id, message, organiser_id, event_id } = req.body;

    // Validate all required fields, including event_id
    if (!notification_id || !attendee_id || !admin_id || !message || !organiser_id || !event_id) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // SQL query to insert data into the notification table, including event_id
    const query =
      "INSERT INTO notification (notification_id, attendee_id, admin_id, message, organiser_id, event_id) VALUES (?, ?, ?, ?, ?, ?)";

    // Execute the query with the event_id included
    const [result] = await db.execute(query, [
      notification_id,
      attendee_id,
      admin_id,
      message,
      organiser_id,
      event_id,
    ]);
    

    // Respond with a success message
    res.status(201).json({
      message: "Notification created successfully.",
      notificationId: notification_id,
    });
  } catch (error) {
    console.error("Error creating notification:", error.message);
    res.status(500).json({ error: "Failed to create notification." });
  }
};

// DELETING THE NOTIFICATIONS USING THE notification_id
exports.deleteNotification = async (req, res) => {
  try {
      const { id } = req.params; 
      if (!id) {
          return res.status(400).json({ error: "Notification ID is required" });
      }

      const query = "DELETE FROM notification WHERE notification_id = ?";
      const [result] = await db.execute(query, [id]);

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Notification not found" });
      }

      res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete notification" });
  }
};

// UPDATING THE MESSAGES OF THE NOTIFICATIONS
exports.updateNotificationMessage = async (req, res) => {
  try {
      const { id } = req.params; 
      const { message, event_id } = req.body;  // Now you can also update event_id

      if (!id) {
          return res.status(400).json({ error: "Notification ID is required" });
      }

      if (!message) {
          return res.status(400).json({ error: "Message is required" });
      }

      // Update the query to set the message and event_id
      const query = "UPDATE notification SET message = ?, event_id = ? WHERE notification_id = ?";
      const [result] = await db.execute(query, [message, event_id, id]);

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Notification not found" });
      }

      res.status(200).json({ message: "Notification updated successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update notification message" });
  }
};

// GETTING THE NOTIFICATIONS BY ID
exports.getNotificationsById = async (req, res) => {
  try {
      const { notification_id } = req.params; 
      if (!notification_id) {
          return res.status(400).json({ error: "Notification ID is required" });
      }

      const query = "SELECT * FROM notification WHERE notification_id = ?";
      const [notifications] = await db.execute(query, [notification_id]);

      if (notifications.length === 0) {
          return res.status(404).json({ message: "No notifications found for the given ID" });
      }

      res.status(200).json(notifications);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve notifications" });
  }
};

// GETTING ALL THE NOTIFICATIONS FROM THE DATABASE
exports.getAllNotifications = async (req, res) => {
  try {
      const query = "SELECT * FROM notification";
      const [notifications] = await db.execute(query);

      if (notifications.length === 0) {
          return res.status(404).json({ message: "No notifications found" });
      }

      res.status(200).json(notifications);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve notifications" });
  }
};

// Test route to check if everything is working
exports.test = (req, res) => {
  console.log("done")
  return res.status(200).json({message : "done"})
};
