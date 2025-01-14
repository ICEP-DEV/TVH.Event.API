const express = require("express");
const {
  addNotification,
  deleteNotification,
  updateNotificationMessage,
  getNotificationsById,
  getAllNotifications,
  test,
} = require("../controllers/notifications.controllers");
const router = express.Router();

router.post("/", addNotification); // Fix from test to addNotification
router.delete("/:id", deleteNotification);
router.put("/update/:id", updateNotificationMessage);
router.get("/", getAllNotifications);
router.get("/:notification_id", getNotificationsById);

module.exports = router;
