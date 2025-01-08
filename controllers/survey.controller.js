
const db = require('../config/config');



const createSurvey = async(req, res)=>{
    const {active_from, event_id, questions, title, expires} = req.body;

    await db.execute(
        "INSERT INTO survey(create_at,expires_at, event_id, questions, title) values (?,?,?,?,?)",
        [active_from, expires,event_id,"awdawd",title]
    ).then((response)=>{
        return res.status(200).json({results : response})
    }).catch((error)=>{
        console.log(req.body)
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



const getAllSurveysForAttendee = async(req, res) =>{
    const {attendee_id} = req.params;
    let surveys = [];
    let allRegisteredEvents = []
    let allFeedback = []
    let inCompletedSurveys = []
    let attendeeSurveys = []

    try{
        
        surveys = await db.execute(
            "select * from survey "
        )
        
        allRegisteredEvents = await db.execute(
            "SELECT r.registration_id, rf.event_id  from registration r " +
            "JOIN registration_form rf on r.registration_form_id = rf.registration_form_id " + 
            "WHERE r.attendee_id = ?",
            [attendee_id]
        )
           
        let condition = "WHERE";
        allRegisteredEvents[0].map((event) =>{
            condition += " f.registration_id = " + event.registration_id + " || ";
        })

        allFeedback = await db.execute(
            "SELECT f.survey_id, rf.event_id from feedback f " + 
            "JOIN registration r on f.registration_id = r.registration_id " + 
            "JOIN registration_form rf on r.registration_form_id = rf.registration_form_id " +  
            condition.slice(0,-4)
        )

        for(i = 0; i < surveys[0].length; i++){
            for(j = 0; j < allRegisteredEvents[0].length; j++){
                if(surveys[0][i].event_id === allRegisteredEvents[0][j].event_id){
                    attendeeSurveys.push(surveys[0][i])
                }
            }
        }
        
        inCompletedSurveys = attendeeSurveys;

        for(i = 0; i < attendeeSurveys.length; i++){
            for(j = 0; j < allFeedback[0].length; j++){
                if(attendeeSurveys[i].survey_id === allFeedback[0][j].survey_id){
                    inCompletedSurveys = inCompletedSurveys.filter(event => event.survey_id != allFeedback[0][j].survey_id)
                }
            }
        } 

        return res.status(200).json({surveys : inCompletedSurveys})


    }catch(error){
        return res.status(500).json({message : error.message})
    }
        
}

module.exports = {
    getAllSurveys,
    createSurvey,
    getSurvey,
    getAllSurveysForAttendee
}
