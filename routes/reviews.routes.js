const express = require('express')
const {createReview,getReviews} = require('../controllers/reviews.controller')
const router = express.Router()


router.post('/create', createReview)
router.get('/event/:event_id', getReviews)





module.exports = router;

