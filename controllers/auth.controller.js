const bcrypt = require('bcrypt')
const db = require('../config/config')
const jwt = require('jsonwebtoken')
const {secret_key} = require('../config/authorization')




const adminCreate = async(req, res)=>{

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



const organiserCreate = async(req, res)=>{
    try{
        let {name, password, email} = req.body;

        password = await bcrypt.hash(password, 10);

        const [result] = await db.execute(
            'INSERT INTO organiser (name, password, email) values (?,?,?)',
            [name, password, email]
        );
        return res.status(200).json({result});
    }
    catch(error){
        return res.status(500).json({message : error.message})
    }
}



const webuserLogin = async(req, res) =>{
    
    try{
        let { email , password } = req.body;
        let type = "";

        let [result] = await db.execute(
            'SELECT * from admin WHERE email = ?', 
            [email]
        );

        if(result.length > 0){
            type = "admin";
        }
        else{
            [result] = await db.execute(
                'SELECT * FROM organiser WHERE email = ?',
                [email]
            );
            if(result.length > 0){
                type = "organiser";
            } 
        }
        

        if(type.length > 0){
            const isValid = await bcrypt.compare(password, result[0].password);
            if(isValid === true){
                const token = jwt.sign(
                    {},
                    secret_key
                )
                return res.status(200).json({
                    token,
                    type,
                    res : {
                        user_id : result[0][type + "_id"],
                        username : result[0].username,
                        email : result[0].email,
                    }
                })
            }
        }
        
        return res.status(403).json({message : "Invalid Credentials"});
    }
    catch(error){
        return res.status(500).json({message : error.message});
    }

}


const attendeeCreate = async(req, res) => {
    let { firstname, lastname, email, password,gender,ethnic_group} = req.body

    password = await bcrypt.hash(password, 10);
    
    await db.execute(
        'INSERT INTO attendee(first_name, last_name, email, password, gender, ethnic_group) values (?,?,?,?,?,?)',
        [firstname, lastname, email, password, gender, ethnic_group]
    ).then((response)=>{
        return res.status(200).json({results : "Account Created"})
    }).catch((error) => {
        return res.status(403).json({message : error.message})
    })
    //console.log(req.body)
    //return res.status(500).json({message : "Something went wrong"})
}


const mobileLogin = async(req, res) => {
    const { email , password, device_id } = req.body;
    try{
        const [response] = await db.execute(
            'Select * from attendee where email = ?',
            [email]
        )
        if(response.length > 0){
            const isValid = await bcrypt.compare(password, response[0].password);
            if(isValid){
                const token = jwt.sign(
                    {},
                    secret_key
                )
                return res.status(200).json({ token, response })
            }
        }
        return res.status(403).json({message : "Invalid Credentials"})

    }catch(error){
        return res.status(500).json({message : error.message})
    }
}



module.exports = {
    attendeeCreate, 
    mobileLogin,
    organiserCreate,
    adminCreate,
    webuserLogin
}
