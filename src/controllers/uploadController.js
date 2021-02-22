const Upload = require('../models/Upload.js');

module.exports =  {

    async index(req, res) {

        const arquivos = await User.findAll();

        if(arquivos == '' || arquivos == null) {
            return res.status(200).send({message: "Nenhum usuário cadastrado"});
        }

        return res.status(200).send({arquivos});
    },

    async store(diretorio,user,empresa) {

        const uploads = await Upload.create({  diretorio, user, empresa });

    }
}