const express = require('express')
const router = express.Router()
const {verifyToken} = require('../config/authorization')
const { deleteOrganiser, getAllOrganiser, getOrganiser, updateOrganiser} = require('../controllers/organiser.controller')




router.get('/', getAllOrganiser)
router.get('/get/:id', getOrganiser)
router.put('/update/:id', updateOrganiser)
router.delete('/delete/:id', deleteOrganiser)



module.exports = router; //only exporting a single object













