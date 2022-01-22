
const { create, sequelize } = require('sequelize/lib/model');
const Documento = require('../models/Documento');
const Empresa = require('../models/Empresa');
const Solicitacao = require('../models/Solicitacoes');
const SolicitacaoDocumentos = require('../models/SolicitacaoDocumentos');
const Historico = require('../models/Historico');
const Helpers = require('../helpers/helpers.js');
const { Op } = require("sequelize");
const UtilService = require('../services/UtilService');
const StatusEnum  = require('../enums/StatusEnum');
const User = require('../models/User');


module.exports = {

    async index(req, res) {
        res.render('./admin/documentos/solicitacao/index')
    },

    async show_solicitacoes(req, res) {

        var solicitacao;

        await Solicitacao.findAll({
            include: [{ model: Empresa, as: 'empresa' }],
            order: [
                ['dt_solicitado', 'DESC'],
                ['created_at', 'DESC'],
            ]
        }).then(function(solic) {
            solicitacao = JSON.parse(JSON.stringify(solic, null, 2));
            
            solicitacao.forEach(item => {
                item.createdAt = UtilService.dateFormat(new Date(item.createdAt));
                if (item.dt_solicitado != null) {
                    item.dt_solicitado = UtilService.dateFormat(new Date(item.dt_solicitado));
                }
            });

            solicitacao['displayName'] = 'John';
        });


        // await Solicitacao.findAll({
        //     include: { association: 'empresa' },
        // }).then(function (solic) {
        //     solicitacao = JSON.parse(JSON.stringify(solic, null, 2));

        //     console.log(solicitacao);

        //     solicitacao['displayName'] = 'John';
        // });

        return res.status(200).send({
            status: true,
            data: solicitacao
        })
    },

    async create(req, res) {
        var empresas;

        await Empresa.findAll({
            where: {empresa_cliente: true}
        }).then(function (emp) {
            empresas = JSON.parse(JSON.stringify(emp, null, 2));
        });

        res.render('./admin/documentos/solicitacao/novo', { layout: false, empresas: empresas })
    },

    async edit(req, res) {

        var solicitacao, empresas;

        await Solicitacao.findOne({
            include: [{ model: Empresa, as: 'empresa' }],
            where: { id: req.params.id }
        }).then(function (solic) {
            solicitacao = JSON.parse(JSON.stringify(solic, null, 2));
        });

        await Empresa.findAll().then(function (emp) {
            empresas = JSON.parse(JSON.stringify(emp, null, 2));
        });

        return res.status(200).render('./admin/documentos/solicitacao/novo', { 
            layout: false, 
            empresas: empresas, 
            solicitacao: solicitacao
        });
    },
    
    async historic(req, res) {

        var solicitacaoId = req.params.id;
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

        return res.status(200).render('./admin/documentos/historico/historico', { 
            layout: false, 
            historicos: historicos
        });
    },

    click_tab_documentos(req, res) {
        return res.status(200).render('./admin/documentos/solicitacao/etapa_documentos', { layout: false })
    },

    async store_solicitacao(req, res) {

        const { solicitacoes_id, empresas_id, descricao } = req.body;
        var solicitacao_return;
        var razaoSocial;

        await Empresa.findByPk(empresas_id).then(function(emp) {
            razaoSocial = emp.razao;
        });

        await Solicitacao.findOne({ where: { id: solicitacoes_id } })
            .then(async function (obj) {
                if (obj) {

                    if (obj.empresa_id != empresas_id || obj.descricao != descricao) {
                        obj.update({
                            empresa_id: +empresas_id,
                            descricao: descricao,
                        }).then(function(solic) {
                            Historico.create({
                                data_hora: new Date(),
                                empresa: razaoSocial,
                                descricao: solic.descricao,
                                status: solic.status,
                                solicitacao_id: solic.id
                            })
                        });
                    }

                } else {

                    var status = StatusEnum.DIGITACAO.descricao;

                    await Solicitacao.create({
                        empresa_id: +empresas_id,
                        status: status,
                        descricao: descricao
                    }).then(function(solic) {
                        solicitacao_return = solic;
                        Historico.create({
                            data_hora: new Date(),
                            empresa: razaoSocial,
                            descricao: solic.descricao,
                            status: solic.status,
                            solicitacao_id: solic.id
                        })
                    });

                    solicitacao_return = JSON.parse(JSON.stringify(solicitacao_return, null, 2));
                }
            })

        return res.status(200).render('./admin/documentos/solicitacao/etapa_documentos', { layout: false, solicitacao: solicitacao_return })

    },

    async delete(req, res) {

        const id  = req.body.id;

        await Solicitacao.findByPk(id)
        .then(async function (solic) {

            const solicitado = StatusEnum.SOLICITADO.descricao;
            const finalizado = StatusEnum.FINALIZADO.descricao;

            var notDestroy = [solicitado, finalizado];

            if(notDestroy.includes(solic.status)) {
                return res.status(200).send({
                    status: false,
                    message: 'Não é possível excluir a solicitação'
                })
            } else {

                solic.destroy();

                return res.status(200).send({
                    status: true,
                    message: 'Deletado com sucesso!'
                })
            }
        });
    },

    async finalizar_solicitacao(req, res) {

        const { solicitacoes_id } = req.body;
        var status = StatusEnum.SOLICITADO.descricao;
        var emrpesaId = req.user.empresaId;
        var razaoSocial;

        await Empresa.findByPk(emrpesaId).then(function(emp) {
            razaoSocial = emp.razao;
        });

        // await Solicitacao.findOne({ where: { id: solicitacoes_id } }).then(function (solic) {
        //     solic.update({
        //         status: status,
        //         dt_solicitado: Date.now()
        //     });
        // });
        var solicitacao = await Solicitacao.findByPk(solicitacoes_id );

        solicitacao.update({
            status: status,
            dt_solicitado: Date.now()
        }).then(function(solic) {
            Historico.create({
                data_hora: new Date(),
                empresa: razaoSocial,
                descricao: solic.descricao,
                status: solic.status,
                solicitacao_id: solic.id
            })
        });

        return res.status(200).send({
            status: true,
            msg: "Solicitação concluída com sucesso!"
        });
    },

    async store_solicitacoes_documentos(req, res) {

        const { solicitacoes_id, solicitacoes_doc } = req.body;
        var solicitacao;

        await Solicitacao.findByPk(solicitacoes_id).then(function (solic) {
            solicitacao = JSON.parse(JSON.stringify(solic, null, 2));
        });

        var solic_ids = solicitacoes_doc.split(",");
        var ano = new Date().getFullYear();

        solic_ids.forEach(async function (id, i) {
            await SolicitacaoDocumentos.create({
                solicitacao_id: solicitacao.id,
                documento_id: id,
                ano: ano
            })
        });

        return res.status(200).send({
            status: true,
            msg: "Documentos inseridos com sucesso"
        })
    },

    async edit_solcicitacoes_documentos(req, res) {
        var solicitacao_doc;
    
        await SolicitacaoDocumentos.findByPk(req.params.id).then(function(solicdoc) {
            solicitacao_doc = JSON.parse(JSON.stringify(solicdoc, null, 2));
        });

        var anos = UtilService.getAnos();
    
        return res.status(200).render('./admin/documentos/solicitacao/modal_edit_solicitacoes_doc', { layout: false, solicitacao_doc: solicitacao_doc, anos: anos });
    },

    async destroy_solcicitacoes_documentos(req, res) {

        const id  = req.body.id;

        await SolicitacaoDocumentos.destroy({
            where: {
                id: id
            }

        });

        return res.status(200).send({
            status: 1,
            message: 'Deletado com sucesso!'
        })
    },

    async modal_adicionar_documentos(req, res) {
        var solicitacaoId = req.params.solicitacaoId;
        res.render('./admin/documentos/solicitacao/modal_cadastrar_documentos', { solicitacaoId: solicitacaoId, layout: false })
    },

    async show_solicitacoes_documentos(req, res) {

        var solicitacoes_documentos;

        await SolicitacaoDocumentos.findAll({
            subQuery: false,
            include:  [{ model: Documento, as: 'documento' }],
            where: { solicitacao_id: req.query.solicitacoes_id }
        }).then(function (solic) {
            solicitacoes_documentos = JSON.parse(JSON.stringify(solic, null, 2));
        });

        return res.status(200).send({
            status: true,
            data: solicitacoes_documentos
        })
    },
}