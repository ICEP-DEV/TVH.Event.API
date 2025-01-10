const express = require("express");  
const { addNotification,deleteNotification,updateNotificationMessage,getNotificationsById,getAllNotifications, test} = require("../controllers/notifications.controllers");  
const router = express.Router(); 

router.post("/", test);

router.delete("/:id", deleteNotification);  

router.put('/update/:id', updateNotificationMessage);

router.get('/notifications', getAllNotifications);

router.get('/notifications/:notification_id', getNotificationsById);




module.exports = router; 