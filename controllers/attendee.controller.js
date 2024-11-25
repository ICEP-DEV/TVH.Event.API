const bcrypt = require('bcrypt')
const db = require('../config/config')
const jwt = require('jsonwebtoken')
const {secret_key} = require('../config/authorization')


const updateDeviceID = async(req, res) =>{
    const {device_id} = req.body;
    
    console.log(device_id)
}

const getAttendeeEvents = async(req, res) =>{
    const {attendee_id} = req.params;

    await db.execute(
        "SELECT e.* from event e " + 
        "JOIN registration_form rf on rf.event_id = e.event_id " +
        "JOIN registration r on r.registration_form_id = rf.registration_form_id " + 
        "WHERE r.attendee_id = ?",
        [attendee_id]
    ).then((response)=>{
        return res.status(200).json({results : response[0]})
    }).catch((error) =>{
        console.log(error)
        return res.status(500).json({message : error.message})
    })
}


module.exports = {
    updateDeviceID,
    getAttendeeEvents
}

