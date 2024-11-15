
const db = require('../config/config')






const getAllSurveys = async(req, res)=>{
    const {event_id} = req.body;
    await db.execute(
        'SELECT * FROM survey where event_id = 1',
        [event_id]
    ).then((response)=>{
        return res.status(200).json({results : response})
    }).catch((error)=>{
        return res.status(500).json({message : error.message})
    })
}


module.exports = {
    getAllSurveys
}
