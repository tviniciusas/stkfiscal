const Documento = require('../models/Documento');
const User = require('../models/User');

module.exports = {

    async index(req, res) {

        var documentos;

        await Documento.findAll().then(function (docs) {
            documentos = JSON.parse(JSON.stringify(docs, null, 2));
            totalRegistros = documentos.length;
        });

        res.render('./admin/documentos/cadastro/index', { 
            documentos: documentos
        });
    },

    async show_documentos(req, res) {
        
        var documentos;

        await Documento.findAll().then(function (docs) {
            documentos = JSON.parse(JSON.stringify(docs, null, 2));
        });

        return res.status(200).send({
            status: true,
            data: documentos
        })
    },

    async store(req, res) {

        const {nome, descricao, extensao } = req.body;
        const id = req.body.documentos_id;
        var message;

        await Documento.findOne({ where: {id: id}})
            .then(function (obj) {
                // update
                if (obj) {
                    message = 'Dados alterados com sucesso';
                    obj.update({nome, descricao, extensao});
                } else {
                    message = 'Dados cadastrados com sucesso';
                    Documento.create({nome, descricao, extensao});
                }
            })

        return res.status(200).send({
            status: 'success',
            message: message
        })
    },

    async edit(req, res) {

        var documento;
    
        await Documento.findByPk(req.params.id).then(function(docs) {
            documento = JSON.parse(JSON.stringify(docs, null, 2));
        });
    
        return res.status(200).send({
            status: true,
            dados: documento
        })
    },

    async delete(req, res) {

        const id  = req.body.id;

        await Documento.destroy({
            where: {
                id: id
            }
        });

        return res.status(200).send({
            status: 1,
            message: 'Deletado com sucesso!'
        })
    },

    async totalRegistros(req, res) {
        var totalRegistros = 0;
    
        await Documento.findAll().then(function (docs) {
            var documentos = JSON.parse(JSON.stringify(docs, null, 2));
            totalRegistros = documentos.length;
        });
    
        return res.status(200).send({
            status: 1,
            totalRegistros: totalRegistros
        })
    }

}