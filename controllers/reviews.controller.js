const db = require('../config/config')
//EVENT REVIEWS


const createReview = async(req, res)=>{
    const {attendee_id, event_id, rating, content} = req.body;
    
    try{
        const response = await db.execute(
            'SELECT r.registration_id from registration r ' + 
            'JOIN registration_form rf on r.registration_form_id = rf.registration_form_id ' + 
            'WHERE r.attendee_id = ? AND rf.event_id = ?',
            [attendee_id, event_id]
        );

        if(response[0].length === 0){
            return res.status(404).json({message : "Attendee not registered for event"})
        }
        let registration_id = response[0][0].registration_id
        await db.execute(
            'DELETE from reviews where registration_id = ?',
            [registration_id]
        );
        const resp = await db.execute(
            'INSERT into reviews(registration_id, rating, content) values(?,?,?)',
            [registration_id,rating, content]
        );

        return res.status(200).json({results : resp[0].affectedRows})
    }catch(error){
        return res.status(500).json({message : error.message})
    }
}

const getReviews = async(req, res)=>{
    const {event_id} = req.params;

    await db.execute(
        "SELECT r.reviews_id, r.rating, r.content, r.submitted, a.first_name, a.last_name from reviews r " + 
        "JOIN registration re on re.registration_id = r.registration_id " +
        "JOIN attendee a on a.attendee_id = re.attendee_id " + 
        "JOIN registration_form rf on rf.registration_form_id = re.registration_form_id " + 
        "WHERE rf.event_id = ?",
        [event_id]
    ).then((response) =>{
        return res.status(200).json({results : response[0]})
    }).catch((error) =>{
        console.log(error);
        return res.status(500).json({message: error.message})
    })
}






module.exports  = {
    createReview,
    getReviews

}