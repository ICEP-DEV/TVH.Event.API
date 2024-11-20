const express = require("express");  
const { addNotification,deleteNotification,updateNotificationMessage,getNotificationsById,getAllNotifications} = require("../controllers/notifications.controllers");  
const router = express.Router(); 

router.post("/", addNotification);

router.delete("/:id", deleteNotification);  

router.put('/update/:id', updateNotificationMessage);

router.get('/notifications/:notification_id', getNotificationsById);

router.get('/notifications', getAllNotifications);


module.exports = router; 