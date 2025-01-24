const express = require('express')
const {createReview,getReviews} = require('../controllers/reviews.controller')
const router = express.Router()
const {authMiddleware} = require('../middleware/authMiddleware')

router.post('/create',authMiddleware, createReview)
router.get('/event/:event_id', getReviews)





module.exports = router;

