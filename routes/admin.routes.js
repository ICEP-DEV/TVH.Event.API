const express = require('express');
const router = express.Router();
const { updateAdmin } = require('../controllers/admin.controller');
const { verifyToken } = require('../config/authorization');



router.put('/update/:id', verifyToken , updateAdmin)



module.exports = router; //only exporting a single object