const Historico = require('../models/Historico');
const Empresa = require('../models/Empresa');
const Solicitacao  = require('../models/Solicitacoes');
const UtilService = require('../services/UtilService');

module.exports = {

    async index(req, res) {
        var empresaId = req.user.empresaClienteId;
        var isAdmin = req.user.admin;
        var solicitacoes;

        if (isAdmin) {
            await Solicitacao.findAll({
                include: [{ model: Empresa, as: 'empresa' }],
                order: [
                    ['dt_solicitado', 'DESC'],
                    ['created_at', 'DESC'],
                ]
            }).then(function (solic) {
                solicitacoes = JSON.parse(JSON.stringify(solic, null, 2));
                solicitacoes.forEach(item => {
                    item.dt_solicitado = UtilService.dateFormat(new Date(item.dt_solicitado));
                });
            });
        }
        else {
            await Solicitacao.findAll({
                where: {empresaId: empresaId},
                order: [
                    ['dt_solicitado', 'DESC'],
                    ['created_at', 'DESC'],
                ]
            }).then(function (solic) {
                solicitacoes = JSON.parse(JSON.stringify(solic, null, 2));
                solicitacoes.forEach(item => {
                    item.dt_solicitado = UtilService.dateFormat(new Date(item.dt_solicitado));
                });
            });
        }

        res.render('./admin/documentos/historico/index', { 
            solicitacoes: solicitacoes,
            isAdmin: isAdmin
        });
    },

    async show_historico(req, res) {
        var solicitacaoId = req.params.solicitacaoId;
        var isAdmin = req.user.admin;
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

        res.render('./admin/documentos/historico/modal_historico', { 
            historicos: historicos, 
            isAdmin: isAdmin,
            layout: false
        });
    }
    
}