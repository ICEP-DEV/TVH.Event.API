const express = require("express");
const cors = require('cors');
const transporter = require('./config/send_email')
const AdminRouter = require('./routes/admin.routes');
const OrganiserRouter = require('./routes/organiser.routes');
const EventRouter = require('./routes/event.routes');
const CategoryRouter = require('./routes/category.routes');
const AttendeeRouter = require('./routes/attendee.routes');
const AuthRouter = require('./routes/auth.routes');
const RegisterRouter = require('./routes/register.routes');
const FeedbackRouter = require('./routes/feedback.routes');
const SurveyRouter = require('./routes/survey.routes');
const ReviewRouter = require('./routes/reviews.routes');
const NotificationsRouter = require('./routes/notifications.routes');
const OrganizationRouter = require('./routes/organization.routes');
const {authMiddleware} = require('./middleware/authMiddleware')


app = express()


// configurations
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors({ origin: '*' }));
app.listen(3001)

app.use('/api/admin', authMiddleware, AdminRouter)
app.use('/api/organiser',authMiddleware, OrganiserRouter)
app.use('/api/event' , EventRouter)
app.use('/api/category',authMiddleware, CategoryRouter)
app.use('/api/attendee', authMiddleware,AttendeeRouter)
app.use('/api/auth', AuthRouter)
app.use('/api/register',authMiddleware, RegisterRouter)
app.use('/api/feedback',authMiddleware, FeedbackRouter);
app.use('/api/notifications',authMiddleware, NotificationsRouter)
app.use('/api/survey',authMiddleware, SurveyRouter)
app.use('/api/reviews', ReviewRouter)
app.use('/api/organization',authMiddleware, OrganizationRouter)


app.post("/" , (req,res) =>{
    return res.status(200).json({message: req.body.message})
})


app.use('/api/send_mail', authMiddleware, send_email)



async function send_email(req, res){
    const {email, subject, content} = req.body;
    await transporter.sendMail({
        from : "info.events@7stack.co.za",
        to : email,
        subject : subject,
        text : content
    }).then((response)=>{

        return res.status(200).json({results : "Success"})
    }).catch((error) =>{
        console.log(error)
        return res.status(500).json({error})
    })
}