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
      res.status(500).json({ message: error.message });
    }
    

  });
};


  

const getAllEvents = async(req, res) => {
    /*
    await db.execute(
        "SELECT event_id, title, description, time, location, admin_id, organiser_id, category_id, start_date, end_date, image FROM event"
      ).then((response) => {
        //console.log("path : " + path.basename)
        return res.status(200).json({results : response[0]})
    }).catch((error) => {
        return res.status(500).json({message : error.message})
    });
    */

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
      return res.status(500).json({message : error.message})
    }
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

