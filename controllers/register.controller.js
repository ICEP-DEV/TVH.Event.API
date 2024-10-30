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
            'SELECT event_id, questionair FROM registration_form WHERE event_id = ?',
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




module.exports = {
    createRegisterForm,
    getRegisterForm
}