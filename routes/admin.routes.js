const express = require('express');
const router = express.Router();



router.post('/create', (req, res)=>{
    let message = req.body.message

    console.log(message)

    res.status(200).json({
        message : "Admin created"
    })
    //console.log("Admin created")
})





module.exports = router;