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

const updatePassword = async(req, res) =>{
    try{
        const {attendee_id, current_password, new_password} = req.body;

        const current_user = await db.execute(
            'SELECT password from attendee where attendee_id = ?',
            [attendee_id]
        );
        const isValid = await bcrypt.compare(current_password, current_user[0][0].password)
        
        if(isValid !== true){
            return res.status(401).json({results : isValid})
        }

        const encryped_password = await bcrypt.hash(new_password,10)
        await db.execute(
            'UPDATE attendee set password = ? where attendee_id = ?',
            [encryped_password, attendee_id]
        ).then((response) =>{
            return res.status(200).json({results : isValid}) 
        })

        
    }
    catch(error){
        return res.status(500).json({message : error.message})
    }
}


const signAttendeeRegister = async(req, res)=>{
    //const {event} = req.params;
    const {registration_id} = req.body;

    await db.execute(
        'SELECT successful from registration WHERE registration_id = ?',
        [registration_id]
    ).then((response) =>{
        if(response[0].successful === 1){
            return res.status(200).json({results : "already signed the register"})
        }
    }).catch((error) =>{
        console.log(error);
        return res.status(500).json({message : error.message})
    })

    await db.execute(
        'UPDATE registration SET successful = 1 WHERE registration_id = ? ',
        [registration_id]
    ).catch((error) =>{
        console.log(error);
        return res.status(500).json({message : error.message})
    })

    return res.status(200).json({results : "Successfully signed register"})

}


module.exports = {
    updateDeviceID,
    getAttendeeEvents,
    updatePassword,
    signAttendeeRegister
}

