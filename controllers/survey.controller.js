
const db = require('../config/config')



const createSurvey = async(req, res)=>{
    const {active_from, event_id, questions, title, expires} = req.body;

    await db.execute(
        "INSERT INTO survey(create_at,expires_at, event_id, questions, title) values (?,?,?,?,?)",
        [active_from, expires,event_id,questions,title]
    ).then((response)=>{
        return res.status(200).json({results : response})
    }).catch((error)=>{

        return res.status(500).json({message:error.message})
    })
}

const getSurvey = async(req, res)=>{
    const {survey_id} = req.params;

    await db.execute(
        "SELECT survey_id, create_at, expires_at, event_id, questions, title from survey WHERE survey_id = ?",
        [survey_id]
    ).then((response) =>{
        return res.status(200).json({results : response[0]})
    }).catch((error)=>{
        return res.status(500).json({message : error.message})
    })
}

const getAllSurveys = async(req, res)=>{
    const {event_id} = req.params;
    await db.execute(
        'SELECT survey_id, create_at, expires_at, event_id, questions, title FROM survey where event_id = ?',
        [event_id]
    ).then((response)=>{
        return res.status(200).json({results : response[0]})
    }).catch((error)=>{
        return res.status(500).json({message : error.message})
    })
}


module.exports = {
    getAllSurveys,
    createSurvey,
    getSurvey
}
