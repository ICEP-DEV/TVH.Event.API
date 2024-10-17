const bcrypt = require('bcrypt')
const db = require('../config/config')
const jwt = require('jsonwebtoken')
const {secret_key} = require('../config/authorization')



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


module.exports = {
    getAllOrganiser,
    getOrganiser,
    updateOrganiser,
    deleteOrganiser,
}

