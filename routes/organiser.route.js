const express = require('express')
const router = express.Router()
const {verifyToken} = require('../config/authorization')
const {createOrganiser, deleteOrganiser, getAllOrganiser, getOrganiser, updateOrganiser, loginOrganiser} = require('../controllers/organiser.controller')



router.post('/create',verifyToken, createOrganiser)
router.get('/', getAllOrganiser)
router.get('/get/:id', getOrganiser)
router.put('/update/:id', updateOrganiser)
router.delete('/delete/:id', deleteOrganiser)
router.post('/login', loginOrganiser)




module.exports = router; //only exporting a single object













