const {secret_key} = require('../config/authorization');
const jwt = require('jsonwebtoken');
const db = require('../config/config');
const bcrypt = require('bcrypt');



const createAdmin = async(req, res)=>{

    let { username, email , password } = req.body;
    password  = await bcrypt.hash(password, 10);

    await db.execute(
        'INSERT INTO admin (username,email,password) VALUES (?,?,?)',
        [username, email, password]
    ).then((response) => {
        return res.status(200).json({result:response})
    }).catch((error) => {
        return res.status(500).json({message : error.message})
    });
}


const loginAdmin = async(req, res) =>{
    try{
        let { email , password } = req.body;

        const [result] = await db.execute('SELECT * from admin WHERE email = ?', [email]);
        if(result.length > 0){
            const isValid = await bcrypt.compare(password, result[0].password);
            if(isValid === true){
                const token = jwt.sign(
                    {},
                    secret_key,
                );
                
                return res.status(200).json({
                    token : token,
                    type : "admin",
                    result
                });
            }
            else{
                return res.status(401).json({message : "Password invalid"})
            }
        }
        else{
            return res.status(404).json({message : "User not found"})
        }

    }
    catch(error){
        console.log(error)
        res.status(500).json({error})
    }
}


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
    createAdmin,
    loginAdmin,
    updateAdmin
}





