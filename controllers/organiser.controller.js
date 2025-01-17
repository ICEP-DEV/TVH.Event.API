const bcrypt = require('bcrypt')
const db = require('../config/config')
const jwt = require('jsonwebtoken')
const {secret_key} = require('../config/authorization')



const getAllOrganiser = async(req, res)=>{
    try{
        await db.execute(
            "SELECT o.organiser_id, o.name, o.email, o.surname, o.is_active, org.name as organization_name FROM organiser o JOIN organization org ON o.organization_id = org.organization_id",
        ).then((response) =>{
            return res.status(200).json(response[0])
        })
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

const archiveOrganiser = async(req, res)=>{

    const {id} = req.params;
    await db.execute(
        "UPDATE organiser SET is_active = 0 WHERE organiser_id = ?",
        [id]
    ).then((response) =>{
        return res.status(200).json({response})
    }).catch((error) =>{
        console.log(error);
    })
}

const reinstateOrganizer = async(req, res)=>{

    const {id} = req.params;

    await db.execute(
        "UPDATE organiser SET is_active = 1 WHERE organiser_id = ?",
        [id]
    ).then((response) =>{
        return res.status(200).json({response})
    }).catch((error) =>{
        console.log(error);
    })

}


module.exports = {
    getAllOrganiser,
    getOrganiser,
    updateOrganiser,
    deleteOrganiser,
    archiveOrganiser,
    reinstateOrganizer
}

