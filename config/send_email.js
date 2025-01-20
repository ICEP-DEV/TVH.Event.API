const nodemailer = require("nodemailer")



const transporter = nodemailer.createTransport(
    {
        host : "mail.7stack.co.za",
        port : 465,
        secure : true,
        auth : {
            user : "info.events@7stack.co.za",
            pass : "7szQd{oX*XY^"
        }
    }
)



module.exports = transporter;