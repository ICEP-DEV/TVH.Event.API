const db = require('../config/config')
const transporter = require('../config/send_email')

const getRegistrationByAttendee = async(req, res) =>{
    const {attendee_id} = req.params;
    await db.execute(
        'SELECT registration_id from registration WHERE attendee_id = ?',
        [attendee_id] 
    ).then((response) =>{
        return res.status(200).json({results : response[0]})
    }).catch((error) =>{
        return res.status(500).json({message : error.message})
    })
        
}

const createRegisterForm = async(req, res) => {
    try{
        const { event_id, questionair } = req.body
        const questionairBlob = Buffer.from(JSON.stringify(questionair));
        await db.execute(
            'INSERT into registration_form(event_id, questionair) values(?,?)',
            [event_id, questionairBlob]
        ).then(()=>{
            return res.status(200).json({message : "Successfully Created"})
        });
    }catch(error){
        return res.status(500).json({message : error.message })
    }
}

const getRegisterForm = async(req, res) => {
    try{
        const event_id = req.params.event_id
        const [rows] = await db.execute(
            'SELECT * FROM registration_form WHERE event_id = ?',
            [event_id]
        );
    
        if (rows.length > 0) {
            const form = rows[0];

            form.questionair = JSON.parse(form.questionair.toString());
            return res.status(200).json({results : form});
        } else {
            return res.status(404).send({ message: 'Registration form not found' });
        }
    }catch(error){
        return res.status(500).json({message : error.message})
    }
}

const submitRegister = async(req, res) =>{
    
    try{
        let {attendee_id, reg_form_id, questions, response, success} = req.body;
        let converted_res = '';

        if(!success){
            success = 0
        }
        
        response.map((ans) =>{
            converted_res += ans + '|'
        });
        

        await db.execute(
            'INSERT INTO registration(attendee_id,registration_form_id,response, successful) VALUES(?,?,?,?)',
            [attendee_id,reg_form_id,converted_res, success]
        ).then(()=>{

            send_confirmation_email(attendee_id,reg_form_id);

            return res.status(200).json({message : "Successfully Registered"})
        });
    }catch(error){
        console.log(error.message)
    }
}


const send_confirmation_email = async(attendee_id, reg_form_id)=>{

    const email = await db.execute(
        'SELECT email from attendee where attendee_id = ?',[attendee_id]
    )

    const event_name = await db.execute(
        'SELECT e.title, e.start_date from event e ' +
        'JOiN registration_form rf on rf.event_id = e.event_id ' +
        'WHERE rf.registration_form_id = ?',
        [reg_form_id]
    )

    await transporter.sendMail({
        from : 'info.events@7stack.co.za',
        to : email[0][0].email,
        subject : 'Application for the ' + event_name[0][0].title + ' event',
        text : 'This email is to serve as a confirmation that you have applied for the ' + event_name[0][0].title + ' event, that will be help on ' + event_name[0][0]['start_date'].toString()
    })

    
}

const checkRegistered = async(req, res)=>{
    try{
        const {attendee_id, event} = req.body;
        const found = await db.execute(
            'SELECT r.* from registration r JOIN registration_form rf ON r.registration_form_id = rf.registration_form_id WHERE r.attendee_id = ? AND rf.event_id = ?',
            [attendee_id, event]
        )
        if(found[0].length > 0){
            return res.status(200).json({message: found[0]})
        }else{
            return res.status(204).json({})
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({message : error.message})
    }
}


const allRegistered = async(req, res)=>{
    try{
        const {event_id} = req.params
        const response = await db.execute(
            'SELECT r.registration_id, r.submitted_at, r.successful, r.response, a.first_name, a.last_name, a.email , a.gender, a.ethnic_group ' +
            'from registration  r ' + 
            'JOIN attendee a on r.attendee_id = a.attendee_id ' + 
            'JOIN registration_form rf on r.registration_form_id = rf.registration_form_id ' +
            'WHERE rf.event_id = ?',
            [event_id]
        )

        return res.status(200).json({results : response[0]})
    }catch(error){
        console.log(error)
        return res.status(500).json({message : error.message})
    }
}

const deleteRegisterForm = async(req, res) =>{
    const {register_form_id} = req.params;

    await db.execute(
        "DELETE from registration_form where registration_form_id = ?",
        [register_form_id]
    ).then((response) =>{
        return res.status(200).json({message : "Success"})
    }).catch((error) =>{
        return res.status(500).json({message : error.message}) 
    });
}

const fetchAllEventsForAttendee = async(req, res) =>{
    const {attendee_id} = req.params;
    await db.execute(
        "SELECT r.successful, e.title, e.event_id " +
        "from registration r " +
        "JOIN registration_form rf on r.registration_form_id = rf.registration_form_id " + 
        "JOIN event e ON rf.event_id = e.event_id " + 
        "WHERE r.attendee_id = ?",
        [attendee_id]
    ).then((response) =>{
        return res.status(200).json({results : response[0]})
    }).catch((error) =>{
        return res.status(500).json({message : error.message})
    })
}

module.exports = {
    createRegisterForm,
    getRegisterForm,
    submitRegister,
    checkRegistered,
    allRegistered,
    deleteRegisterForm,
    getRegistrationByAttendee,
    fetchAllEventsForAttendee,
}