const express = require("express");  
const { addNotification,deleteNotification,updateNotificationMessage,getNotificationsById,getAllNotifications, test} = require("../controllers/notifications.controllers");  
const router = express.Router(); 

router.post("/", test);

router.delete("/:id", deleteNotification);  

router.put('/update/:id', updateNotificationMessage);

router.get('/', getAllNotifications);

router.get('/:notification_id', getNotificationsById);




module.exports = router; 