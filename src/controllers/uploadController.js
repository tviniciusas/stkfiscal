const Upload = require('../models/Upload.js')
const file = require('../config/upload')
const User = require('../models/User.js')

module.exports =  {
    
    async index(req, res) {
      
    },

    async store(req, res) {

        const { mes, ano } = req.body
        let diretorio = req.file.destination
        let archive = req.file

        const up = await Upload.create({ diretorio, mes, ano ,archive }).then(() => {
            req.flash('success_msg','Arquivo enviado com sucesso!')
            res.redirect('/upload')
            console.log(diretorio,ano, mes,archive)

        }).catch(e => {
            req.flash('error_msg','erro no envio do arquivo, tente novamente')
            res.redirect('/upload')
        })
    }
}


