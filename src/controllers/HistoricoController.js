const Sequelize = require('sequelize');
const Historico = require('../models/Historico');
const Documento = require('../models/Documento');
const Empresa = require('../models/Empresa');
const SolicitacaoDocumentos = require('../models/SolicitacaoDocumentos');
const Solicitacao  = require('../models/Solicitacoes');
const StatusEnum = require('../enums/StatusEnum');
const UtilService = require('../services/UtilService');

module.exports = {

    async index(req, res) {
        var empresaId = req.user.empresaId;
        var solicitacoes;

        await Solicitacao.findAll({
            subQuery: false,
            include: [
                { model: Empresa, as: 'empresa' }
            ],
            where: {empresa_id: empresaId},
            order: [
                ['dt_solicitado', 'DESC'],
                ['created_at', 'DESC'],
            ]
        }).then(function (solic) {
            solicitacoes = JSON.parse(JSON.stringify(solic, null, 2));
        });

        res.render('./admin/documentos/historico/index', { 
            solicitacoes: solicitacoes
        });
    },

    async show_historico(req, res) {
        
        var solicitacaoId = req.params.solicitacaoId;
        var historicos;

        await Historico.findAll({
            where: {solicitacao_id: solicitacaoId},
            order: [
                ['id', 'DESC']
            ]
        }).then(function (hist) {
            historicos = JSON.parse(JSON.stringify(hist, null, 2));
            historicos.forEach(item => {
                item.data_hora = UtilService.dateFormat(new Date(item.data_hora), true);
            });
        });

        res.render('./admin/documentos/historico/historico', { 
            historicos: historicos
        });
    }
    
}