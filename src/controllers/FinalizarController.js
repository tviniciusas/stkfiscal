const Solicitacao = require('../models/Solicitacoes');
const SolicitacaoDocumento = require('../models/SolicitacaoDocumentos');
const Documento = require('../models/Documento');
const Empresa = require('../models/Empresa');
const Upload = require('../models/Upload');
const Historico = require('../models/Historico');
const StatusEnum = require('../enums/StatusEnum');
const UtilService = require('../services/UtilService');

module.exports =  {

    async index(req, res) {
        const status = StatusEnum.ATENDIDO.descricao;
        var solicitacoes;

        await Solicitacao.findAll({
            include: [{ model: Empresa, as: 'empresa' }],
            where: { status: status },
            order: [
                ['dt_atendido', 'DESC'],
                ['dt_solicitado', 'DESC']
            ]
        }).then(solic => {
            solicitacoes = JSON.parse(JSON.stringify(solic, null, 2));

            solicitacoes.forEach(item => {
                item.dt_solicitado = UtilService.dateFormat(new Date(item.dt_solicitado));
                item.dt_atendido = UtilService.dateFormat(new Date(item.dt_atendido));
            });
        });

        res.render('./admin/documentos/finalizar/index', {
            solicitacoes: solicitacoes
        });
    },

    async modal_finalizar(req, res) {
        const solicitacaoId = req.params.solicitacaoId;
        var solicitacao;
        var documentos;
        var uploads;

        await Solicitacao.findOne({
            include: [{model: Empresa, as: 'empresa'}],
            where: { id: solicitacaoId }
        }).then(solic => {
            solicitacao = JSON.parse(JSON.stringify(solic, null, 2));

            solicitacao.dt_solicitado = UtilService.dateFormat(new Date(solicitacao.dt_solicitado));
            solicitacao.dt_atendido = UtilService.dateFormat(new Date(solicitacao.dt_atendido));
        });

        await Documento.findAll({
            include: [{
                model: SolicitacaoDocumento, as: 'solicitacao',
                where: {
                    solicitacaoId: solicitacaoId
                }
            }]
        }).then(doc => {
            documentos = JSON.parse(JSON.stringify(doc, null, 2));
        });

        await Upload.findAll({
            where: {
                solicitacaoId: solicitacaoId
            }
        }).then(up => {
            uploads = JSON.parse(JSON.stringify(up, null, 2));
        });

        res.render('./admin/documentos/finalizar/modal_finalizar', { 
            solicitacao: solicitacao, 
            documentos: documentos,
            uploads: uploads,
            layout: false 
        });
    },

    async store(req, res) {
        const solicitacaoId = req.body.solicitacaoId;
        const status = StatusEnum.FINALIZADO.descricao;
        var solicitacao;
        var razaoSocial;
        var message = 'Falha ao finalizar a solicitacao';

        try {

            await Solicitacao.findOne({
                include: [{model: Empresa, as: 'empresa'}],
                where: {
                    id: solicitacaoId
                }
            }).then(solic => {
                solicitacao = solic;
                razaoSocial = solic.empresa.razao;
            }).catch(error => {
                throw message;
            });
    
            await solicitacao.update({
                dt_finalizado: new Date(),
                status: status
            }).catch(error => {
                throw message;
            });

            await Historico.create({
                data_hora: new Date(),
                empresa: razaoSocial,
                descricao: solicitacao.descricao,
                status: solicitacao.status,
                solicitacaoId: solicitacao.id
            })
    
            message = 'Solicitacao finalizada com sucesso!';
    
            return res.status(200).send({
                status: 'success',
                message: message
            });
            
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error
            });
        }
    }

}