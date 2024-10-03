const express = require("express")
const cors = require('cors');
const AdminRouter = require('./routes/admin.routes')
const {verifyToken} = require('./config/authorization')


app = express()



app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.listen(3001)


app.use('/admin', AdminRouter)

app.get("/" , (req,res) =>{
    return res.status(200).json({message: req.body.message})
})

