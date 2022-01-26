const Documento = require('../models/Documento');
const SolicitacaoDocumentos = require('../models/SolicitacaoDocumentos');
const DocumentoService = require('../services/DocumentoService');

function fieldsValidate(documento) {
    var msg = '';

    if (documento.nome === null || documento.nome === '') {
        msg = 'O campo Nome é obrigatório';
    }
    else if (documento.extensao === null || documento.extensao === '') {
        msg = 'O campo Extensão é obrigatório';
    }
    else if (documento.descricao === null || documento.descricao === '') {
        msg = 'O campo Descrição é obrigatório';
    }
    
    return msg;   
} 

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

        const documento = { 
            nome: req.body.nome,
            descricao: req.body.descricao, 
            extensao: req.body.extensao,
        };
        const id = req.body.documentos_id;
        var message;

        try {

            message = fieldsValidate(documento);
            if (message !== '') {
                throw message;
            }

            await Documento.findOne({ where: {id: id}})
            .then(async function (obj) {
                // update
                if (obj) {
                    await obj.update({
                        nome: documento.nome, 
                        descricao: documento.descricao, 
                        extensao: documento.extensao
                    }).then(doc => {
                        message = 'Dados atualizados com sucesso';
                    }).catch(error => {
                        message = 'Falha ao atualizar documento';
                        throw message;
                    });
                } else {
                    await Documento.create({
                        nome: documento.nome, 
                        descricao: documento.descricao, 
                        extensao: documento.extensao
                    }).then(doc => {
                        message = 'Dados cadastrados com sucesso';
                    }).catch(error => {
                        message = 'Falha ao cadastrar documento';
                        throw message;
                    });
                }
            })

            return res.status(200).send({
                status: 'success',
                message: message
            });
        } catch (error) {
            return res.status(400).send({
                status: 'error',
                message: error
            });
        }
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