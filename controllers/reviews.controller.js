const db = require('../config/config')

const createReview = async(req, res)=>{
    const {registration_id, rating, content} = req.body;
    await db.execute(
        "INSERT into reviews(registration_id,rating,content) values(?,?,?)",
        [registration_id, rating, content]
    ).then((response) =>{
        return res.status(200).json({results : response})
    }).catch((error) =>{
        console.log(error);
        return res.status(500).json({message: error.message})
    })
}

const getReviews = async(req, res)=>{
    const {event_id} = req.params;

    await db.execute(
        "SELECT r.rating, r.content, r.submitted, a.first_name, a.last_name from reviews r " + 
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