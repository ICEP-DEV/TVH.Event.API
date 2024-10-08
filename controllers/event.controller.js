const db = require('../config/config');




const createEvent = async(req, res) => {
    const { title , description, time, location, start_date, end_date, category_id, admin_id, organiser_id } = req.body;

    await db.execute(
        "INSERT into event (title, description, time, location, admin_id, organiser_id, category_id, start_date, end_date) values (?,?,?,?,?,?,?,?,?)",
        [title, description,time, location, admin_id, organiser_id, category_id, start_date, end_date]
    ).then((response) =>{
        return res.status(200).json({results : response})
    }).catch((error) => {
        return res.status(500).json({message : error.message})
    });
    
}

const getAllEvents = async(req, res) => {
    await db.execute(
        "SELECT event_id, title, description, time, location, admin_id, organiser_id, category_id, start_date, end_date FROM event"
    ).then((response) => {
        return res.status(200).json({results : response[0]})
    }).catch((error) => {
        return res.status(500).json({message : error.message})
    });
}

const getEvent = async(req, res) => {
    const {id} = req.params;

    //await db.execute()
}

const getEventByUser = async(req, res) => {
    
    //db.execute()
}

const getEventByCategory = async(req, res) => {
    
    //db.execute()
}

const updateEvent = async(req, res) => {
    
    //db.execute()
}

const deleteEvent = async(req, res) => {

    //db.execute()
}



module.exports = {
    createEvent,
    getAllEvents,
    getEvent,
    getEventByUser,
    updateEvent,
    deleteEvent,
    getEventByCategory
}

