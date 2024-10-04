const bcrypt = require('bcrypt')
const db = require('../config/config')
const jwt = require('jsonwebtoken')
const {secret_key} = require('../config/authorization')

const createOrganiser = async(req, res)=>{
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

const getAllOrganiser = async(req, res)=>{
    try{
        [result] = await db.execute(
            'SELECT * from organiser'
        );
        return res.status(200).json(result)
    }
    catch(error){
        return res.status(500).json({message : error.message})
    }
}

const getOrganiser = async(req, res)=>{
    try{
        const {id} = req.params;

        const [result] = await db.execute(
            'SELECT * from organiser WHERE organiser_id = ?',
            [id]
        )
        return res.status(200).json(result)
    }
    catch(error){
        return res.status(500).json({message : error.message})
    }
}

const updateOrganiser = async(req, res)=>{
    try{
        const { organiser_id, name, password } = req.body;

        const [result] = await db.execute(
            'UPDATE organiser SET name = ?, password = ? WHERE organiser_id = ?',
            [name, password, organiser_id] 
        )

        return res.status(200).json({result})
    }
    catch(error){
        return res.status(500).json({message : error.message})
    }
}

const forgotPassword = async(req, res)=>{
    const {email} = req.body;
    // send email to the organiser
}


const deleteOrganiser = async(req, res)=>{
    try{
        const { organiser_id } = req.body;

        const [result] = db.execute(
            'DELETE FROM organiser WHERE organiser_id = ?',
            [organiser_id]
        )
        return res.status(200).json({result})
    }
    catch(error){
        return res.status(500).json({message : error.message})
    }
}

const loginOrganiser = async(req, res)=>{
    try{    
        const { email, password} = req.body;
        const [result] = await db.execute(
            'SELECT * FROM organiser WHERE email=?',
            [email]
        );
        if(result.length > 0){
            const isValid = await bcrypt.compare(password, result[0].password);
            if(isValid === true){

                const token = jwt.sign(
                    {},
                    secret_key
                )

                return res.status(200).json({
                    token,
                    type : "organiser",
                    result
                })
            }
            else{
                return res.status(401).json({message : "Password invalid"})
            }
        }
        else{
            return res.status(404).json({message: "Organiser not found"})
        }
    }
    catch(error){
        return res.status(500).json({message : error.message})
    }
}



module.exports = {
    createOrganiser,
    getAllOrganiser,
    getOrganiser,
    updateOrganiser,
    deleteOrganiser,
    loginOrganiser
}

