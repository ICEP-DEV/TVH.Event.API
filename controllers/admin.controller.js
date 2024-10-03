const {secret_key} = require('../config/authorization');
const jwt = require('jsonwebtoken');
const db = require('../config/config');
const bcrypt = require('bcrypt');



const createAdmin = async(req, res)=>{
    try{
        let { username, email , password } = req.body;
        
        password  = await bcrypt.hash(password, 10);

        const [result] = await db.execute('INSERT INTO admin (username,email,password) VALUES (?,?,?)', [username, email, password])

        return res.status(200).json({result:result})

    }catch(error){
        return res.status(500).json({error})
    }
}


const loginAdmin = async(req, res) =>{
    try{
        let { username, password } = req.body;

        const [result] = await db.execute('SELECT username, password from admin WHERE username = ?', [username]);

        if(result.length > 0){

            if(bcrypt.compare(password, result[0].password) === true){
                const token = jwt.sign(
                    {
                        username : result[0].username 
                    },
                    secret_key,
                );
                
                return res.status(200).json({
                    token : token,
                    type : "admin",
                    user_id : result[0].admin_id,
                    email : result[0].email,
                    username : result[0].username 
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
        res.status(500).json({error})
    }
}


const updateAdmin = async(req, res)=>{
    try{
        let { user_id, username, email , password } = req.body;

        password = await bcrypt.hash(password, 10);

        const [result] = await db.execute("UPDATE admin set username = ?, email = ?, password = ? WHERE admin_id = ?", [username, email, password ,user_id]);

        return res.status(200).json({result})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error})
    }
}




module.exports = {
    createAdmin,
    loginAdmin,
    updateAdmin
}





