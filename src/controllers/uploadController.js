const Upload = require('../models/Upload.js')
const file = require('../config/Upload')
const User = require('../models/User.js')

module.exports =  {
    
    async index(req, res) {

      


    },

    async store(req, res) {

        const { mes, ano } = req.body
        const file = req.file
        const diretorio = file.path

        const up = await Upload.create({ diretorio , mes, ano  }).then(() => {
            req.flash('success_msg','Arquivo enviado com sucesso!')
            res.redirect('/upload')
            console.log(diretorio, mes, ano, file)

        }).catch(e => {
            req.flash('error_msg','erro no envio do arquivo, tente novamente' + e)
            res.redirect('/upload')
        })
    }
}


