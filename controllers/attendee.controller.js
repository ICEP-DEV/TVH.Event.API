const bcrypt = require('bcrypt')
const db = require('../config/config')
const jwt = require('jsonwebtoken')
const {secret_key} = require('../config/authorization')


const updateDeviceID = async(req, res) =>{
    const {device_id} = req.body;
    
    console.log(device_id)
}


module.exports = {
    updateDeviceID
}

