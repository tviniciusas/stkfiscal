const nodemailer = require('nodemailer')

const user = 'istok@stokfiscal.com.br'
const pass = 'TIstok10$'

const transporter = nodemailer.createTransport({
    name: "no-reply@stokfiscal.com.br",
    host: "mail.stokfiscal.com.br",
    port: 465,
    secure: true, 
    auth: {  user, pass  },
})
  

module.exports =  transporter