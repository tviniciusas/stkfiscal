const Solicitar = require('../models/Solicitacao.js');


module.exports = {

    async index(req, res) {

        var solicitacoes;

        await Solicitar.findAll().then(function (docs) {
            solicitacoes = JSON.parse(JSON.stringify(docs, null, 2));
        });

        res.render('./admin/solicitacao/index', { solicitacoes: solicitacoes })
    },

    async show_solicitacoes(req, res) {

        var solicitacoes;

        await Solicitar.findAll().then(function (docs) {
            solicitacoes = JSON.parse(JSON.stringify(docs, null, 2));
        });

        return res.status(200).send({
            status: true,
            data: solicitacoes
        })
    },

    async store(req, res) {

        const {empresa, descricao, documento } = req.body;
        const id = req.body.solicitacoes_id;

        var message;

        await Solicitar.findOne({ where: {id: id}})
            .then(function (obj) {
                // update
                if (obj) {
                    message = 'Dados alterados com sucesso';
                    obj.update({empresa, descricao, documento});
                } else {
                    message = 'Dados cadastrados com sucesso';
                    Solicitar.create({empresa, descricao, documento});
                }
            }).catch(e =>{
                    message = 'Erro no cadastro ' + e.message;

            })

        return res.status(200).send({
            status: 'success',
            message: message
        })
    },

    async edit(req, res) {

        var documento;
    
        await Solicitar.findByPk(req.params.id).then(function(docs) {
            documento = JSON.parse(JSON.stringify(docs, null, 2));
        });
    
        return res.status(200).send({
            status: true,
            dados: documento
        })
    },

    async delete(req, res) {

        const id  = req.body.id;

        await Solicitar.destroy({
            where: {
                id: id
            }
        });

        return res.status(200).send({
            status: 1,
            message: 'Deletado com sucesso!'
        })
    }
}