const Documento = require('../models/Documento');
const SolicitacaoDocumentos = require('../models/SolicitacaoDocumentos');
const Solicitacoes = require('../models/Solicitacoes');
const User = require('../models/User');
const DocumentoService = require('../services/DocumentoService');

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
    
    async show_documentos_modal(req, res) {
        
        var solicitacao_id = req.params.solicitacaoId;
        var solicitacaoDocumentos;
        var documentos;

        documentos = await Documento.findAll();
        solicitacaoDocumentos = await SolicitacaoDocumentos.findAll({
            where: {solicitacaoId: solicitacao_id}
        });

        documentos = DocumentoService.filtrarDocumentos(documentos, solicitacaoDocumentos);
        documentos = JSON.parse(JSON.stringify(documentos, null, 2));

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
                    obj.update({nome, descricao, extensao});
                    message = 'Dados alterados com sucesso';
                } else {
                    Documento.create({nome, descricao, extensao});
                    message = 'Dados cadastrados com sucesso';
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

    async delete_modal(req, res) {
        var documento = await Documento.findByPk(req.params.documentoId);
    
        return res.status(200).send({
            status: true,
            documento: documento
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