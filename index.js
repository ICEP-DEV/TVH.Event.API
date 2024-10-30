const express = require("express");
const cors = require('cors');
const AdminRouter = require('./routes/admin.routes');
const OrganiserRouter = require('./routes/organiser.route');
const EventRouter = require('./routes/event.routes');
const CategoryRouter = require('./routes/category.routes');
const AttendeeRouter = require('./routes/attendee.route');
const AuthRouter = require('./routes/auth.routes');
const RegisterRouter = require('./routes/register.routes');
const {verifyToken} = require('./config/authorization');


app = express()


// configurations
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors({ origin: '*' }));
app.listen(3001)


app.use('/api/admin', AdminRouter)
app.use('/api/organiser', OrganiserRouter)
app.use('/api/event', EventRouter)
app.use('/api/category', CategoryRouter)
app.use('/api/attendee', AttendeeRouter)
app.use('/api/auth', AuthRouter)
app.use('/api/register', RegisterRouter)


app.get("/" , (req,res) =>{
    return res.status(200).json({message: req.body.message})
})

