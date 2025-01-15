const db = require("../config/config");

// CREATING A NOTIFICATION
exports.addNotification = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

    
    const { admin_id, organiser_id, event_id, message } = req.body;

    
    if (!admin_id || !organiser_id || !event_id || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    
    const query =
      "INSERT INTO notification (admin_id, organiser_id, event_id, message) VALUES (?, ?, ?, ?)";

    
    const [result] = await db.execute(query, [admin_id, organiser_id, event_id, message]);

    res.status(201).json({
      message: "Notification created successfully.",
      notificationId: result.insertId, 
    });
  } catch (error) {
    console.error("Error creating notification:", error.message);
    res.status(500).json({ error: "Failed to create notification." });
  }
};

// DELETING A NOTIFICATION
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

// UPDATING THE MESSAGE OF A NOTIFICATION
exports.updateNotificationMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, event_id } = req.body; // Include event_id if it needs to be updated

    if (!id) {
      return res.status(400).json({ error: "Notification ID is required" });
    }

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // SQL query to update the message (and event_id if provided)
    const query =
      "UPDATE notification SET message = ?, event_id = ? WHERE notification_id = ?";
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

// GETTING NOTIFICATIONS BY ID
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

// GETTING ALL NOTIFICATIONS
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

// TEST ROUTE
exports.test = (req, res) => {
  console.log("Test route hit");
  res.status(200).json({ message: "done" });
};
