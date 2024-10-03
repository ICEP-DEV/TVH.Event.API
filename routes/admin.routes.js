const express = require('express');
const router = express.Router();
const {createAdmin, loginAdmin, updateAdmin} = require('../controllers/admin.controller');
const { verifyToken } = require('../config/authorization');


router.post('/create', createAdmin)
router.post('/login', loginAdmin)
router.put('/update', verifyToken , updateAdmin)



module.exports = router;