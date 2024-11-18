const db = require('../config/config')




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
        const {attendee_id, reg_form_id, response, questions} = req.body;
        const answers = []
        questions.map((question) =>{
            if(question !== ""){
                console.log(response[question])
                answers.push(response[question])
            }
        });
        await db.execute(
            'INSERT INTO registration(attendee_id,registration_form_id,response) VALUES(?,?,?)',
            [attendee_id,reg_form_id,answers]
        ).then(()=>{
            return res.status(200).json({message : "Successfully Registered"})
        });


    }catch(error){
        console.log(error.message)
    }
}

const checkRegistered = async(req, res)=>{
    try{
        
        const {attendee_id, event} = req.body;
        const found = await db.execute(
    
            'SELECT r.* from registration r JOIN registration_form rf ON r.registration_form_id = rf.registration_form_id WHERE r.attendee_id = ? AND rf.event_id = ?',
            [attendee_id, event]
        )
        if(found[0].length > 0){
            return res.status(200).json({message: "Already Registered"})
        }else{
            return res.status(204).json({message : "Not registered yet"})
        }
    }catch(error){
        return res.status(500).json({message : error.message})
    }
}


const allRegistered = async(req, res)=>{
    try{
        const {event_id} = req.params
        const response = await db.execute(
            'SELECT r.registration_id, r.submitted_at, r.successful, r.response, a.first_name, a.last_name, a.email ' +
            'from registration  r ' + 
            'JOIN attendee a on r.attendee_id = a.attendee_id ' + 
            'JOIN registration_form rf on r.registration_form_id = rf.registration_form_id ' +
            'WHERE rf.event_id = ?',
            [event_id]
        )

        return res.status(200).json({results : response[0]})
    }catch(error){
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

module.exports = {
    createRegisterForm,
    getRegisterForm,
    submitRegister,
    checkRegistered,
    allRegistered,
    deleteRegisterForm
}