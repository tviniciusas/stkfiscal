const Documento = require('../models/Documento');
const User = require('../models/User');


module.exports = {

    async index(req, res) {

        var documentos;

        await Documento.findAll().then(function (docs) {
            documentos = JSON.parse(JSON.stringify(docs, null, 2));
        });

        res.render('./admin/documentos/cadastro/index', { documentos: documentos })
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

    async update(req, res) {

        const { nome, razao, cnpj, ie, telefone, email, estado, cidade } = req.body;
        const { idemp } = req.params;

        await Empresa.update({
            nome, razao, cnpj, ie, telefone, email, estado, cidade
        }, {
            where: {
                id: idemp
            }
        });
        return res.status(200).send({
            status: 1,
            message: 'Empresa atualizada com sucesso!',
        })
    },

    async delete(req, res) {

        const { idemp } = req.params;

        await Empresa.destroy({
            where: {
                id: idemp
            }

        });
        return res.status(200).send({
            status: 1,
            message: 'Deletado com sucesso!'
        })
    }
}