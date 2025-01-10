const db = require("../config/config");
//CREATING CRUD APPLICATION
//CREATING A NOTIFICATION
exports.addNotification = async (req, res) => {
    try {
      const { notification_id, attendee_id, admin_id, message, organiser_id } = req.body;
      if (!attendee_id || !admin_id || !message || !organiser_id) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      
      const query =
      "INSERT INTO notification (notification_id, attendee_id, admin_id, message, organiser_id) VALUES (?, ?, ?, ?, ?)";
      const [result] = await db.execute(query, [
        notification_id,
        attendee_id,
        admin_id,
        message,
        organiser_id,
      ]);
      
      console.log("Results : " + result);
      return res
        .status(201)
        .json({ message: "Notification created successfully", notificationId: result.insertId });
    } catch (error) {
     
      console.error(error);
      res.status(500).json({ error: error.message });
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
//UPDATING THE MESSAGES OF THE NOTIFICATIONS 
exports.updateNotificationMessage = async (req, res) => {
  try {
      const { id } = req.params; 
      const { message } = req.body; 
      if (!id) {
          return res.status(400).json({ error: "Notification ID is required" });
      }

      if (!message) {
          return res.status(400).json({ error: "Message is required" });
      }

      const query = "UPDATE notification SET message = ? WHERE notification_id = ?";
      const [result] = await db.execute(query, [message, id]);

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Notification not found" });
      }

      res.status(200).json({ message: "Notification updated successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update notification message" });
  }
};
//GETTING THE NOTIFICATIONS BY ID
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
//GETTING ALL THE NOTIFICATIONS ON THE DATABABE
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


exports.test = (req, res) =>{
  console.log("done")
  return res.status(200).json({message : "done"})
}
