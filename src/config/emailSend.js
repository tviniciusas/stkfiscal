const nodemailer = require('nodemailer')

const user = 'thiago@masconsultoria.com.br'
const pass = 'damit666'

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {  user, pass  },
  })

module.exports =  transporter