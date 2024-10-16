const {secret_key} = require('../config/authorization');
const jwt = require('jsonwebtoken');
const db = require('../config/config');
const bcrypt = require('bcrypt');






const updateAdmin = async(req, res)=>{
    let { user_id, username, email , password } = req.body;
    password = await bcrypt.hash(password, 10);

    await db.execute(
        "UPDATE admin set username = ?, email = ?, password = ? WHERE admin_id = ?",
        [username, email, password ,user_id]
    ).then((response) => {
        return res.status(200).json({result : response[0]})
    }).catch((error) => {
        return res.status(500).json({message : error.message})
    });
}




module.exports = {
    updateAdmin
}





