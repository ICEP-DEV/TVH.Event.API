const db = require('../config/config');
const multer = require('multer')



const storage = multer.memoryStorage();
  
const upload = multer({ storage: storage });
  
const createEvent = async (req, res) => {
  upload.single('image')(req, res, async function (err) {
    const { title, description, time, location, admin_id, organiser_id, category_id, start_date, end_date } = req.body;
    
    if (err) {
      console.log("error : " + err)
      return res.status(500).json({ message: 'File upload error', error: err.message });
    }

    const image = req.file.buffer

    //const imagePath = `../assets/events/${req.body.title.replace(/\s+/g, '_')}${fileExtension}`;

    try {
      // Insert into the database
      const result = await db.execute(
        "INSERT INTO event (title, description, time, location, admin_id, organiser_id, category_id, start_date, end_date, image) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [title, description, time, location, admin_id, organiser_id, category_id, start_date, end_date, image]
      );
      
      res.status(200).json({ results: result });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
    }
    

  });
};


  

const getAllEvents = async(req, res) => {

    try{
      const [rows] = await db.execute("SELECT event_id, title, description, time, location, admin_id, organiser_id, category_id, start_date, end_date, image FROM event");
      const events = rows.map(row => {
        return {
          ...row,
          image : row.image? row.image.toString('base64') : null
        }
      });

      return res.status(200).json({results : events})
    }
    catch(error){
      console.log(error.message)
      return res.status(500).json({message : error.message})
    }
}

const getEvent = async(req, res) => {
  try{
    const {event_id}= req.params;
    const sql = "SELECT event_id, title, description, time, location, admin_id, organiser_id, category_id, start_date, end_date, image FROM event where event_id = " + event_id;
    const [rows] = await db.execute(
      sql
    );
    const events = rows.map(row => {
      return {
        ...row,
        image : row.image? row.image.toString('base64') : null
      }
    });

    return res.status(200).json({results : events})
  }
  catch(error){

    return res.status(500).json({message : error.message})
  }
}

const getEventByUser = async(req, res) => {
    try{
      const {type, user_id} = req.body;
      const sql = "SELECT event_id, title, description, time, location, admin_id, organiser_id, category_id, start_date, end_date, image FROM event where " + type + "_id = ?";
      const [rows] = await db.execute(
        sql,
        [user_id]
      );
      const events = rows.map(row => {
        return {
          ...row,
          image : row.image? row.image.toString('base64') : null
        }
      });

      return res.status(200).json({results : events})
    }
    catch(error){

      return res.status(500).json({message : error.message})
    }
}

const getEventByCategory = async(req, res) => {
    const {category} = req.body;
    //await db.execute("Select * From event where cate")
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

