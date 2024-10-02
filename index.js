const express = require("express")
const cors = require('cors');
const db = require('./config/config')

app = express()



app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

app.listen(3001)


app.get("/" , (req,res) =>{
    return res.status(200).json({message: req.body.message})
})

