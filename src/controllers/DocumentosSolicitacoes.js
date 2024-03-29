
const { create, sequelize } = require('sequelize/lib/model');
const Documento = require('../models/Documento');
const Empresa = require('../models/Empresa');
const Solicitacao = require('../models/Solicitacoes');
const SolicitacaoDocumentos = require('../models/SolicitacaoDocumentos');
const Historico = require('../models/Historico');
const { Op } = require("sequelize");
const UtilService = require('../services/UtilService');
const StatusEnum  = require('../enums/StatusEnum');
const User = require('../models/User');

function fieldsValidate(empresaId, descricao) {
    var msg = '';

    if (!empresaId) {
        msg = 'O campo Empresa é obrigatório';
    }
    else if (!descricao.trim()) {
        msg = 'O campo Descricao é obrigatório';
    }
    
    return msg;   
} 

module.exports = {

    async index(req, res) {
        res.render('./admin/documentos/solicitacao/index')
    },

    async show_solicitacoes(req, res) {

        var solicitacao;

        await Solicitacao.findAll({
            include: [{ model: Empresa, as: 'empresa' }],
            order: [
                ['status', 'ASC'],
                ['created_at', 'DESC'],
                ['dt_solicitado', 'DESC']
            ]
        }).then(function(solic) {
            solicitacao = JSON.parse(JSON.stringify(solic, null, 2));
            
            solicitacao.forEach(item => {
                item.createdAt = UtilService.dateFormat(new Date(item.createdAt));
                if (item.dt_solicitado != null) {
                    item.dt_solicitado = UtilService.dateFormat(new Date(item.dt_solicitado));
                }
            });
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

        await User.findAll({
            include: [{model: Empresa, as: 'empresaCliente'}],
            where: {
                empresaClienteId: {
                    [Op.not]: null
                },
                admin: false
            }
        }).then(function(user) {
            var emp = [];
            user.forEach(u => {
                emp.push(u.empresaCliente);
            });

            emp = UtilService.orderByName(emp);

            empresas = JSON.parse(JSON.stringify(emp, null, 2));
        });

        res.render('./admin/documentos/solicitacao/novo', { layout: false, empresas: empresas })
    },

    async edit(req, res) {

        var solicitacao, empresas;
        const statusDigitacao = StatusEnum.DIGITACAO;
        var message;

        try {
            await Solicitacao.findOne({
                include: [{ model: Empresa, as: 'empresa' }],
                where: { id: req.params.id }
            }).then(function (solic) {
                solicitacao = JSON.parse(JSON.stringify(solic, null, 2));
            });
    
            var retorno = StatusEnum.getByDescription(solicitacao.status)
            if (retorno !== statusDigitacao) {
                message = 'Não é possível atualizar esta solicitação'
                throw message;
            }
    
            await User.findAll({
                include: [{model: Empresa, as: 'empresaCliente'}],
                where: {
                    empresaClienteId: {
                        [Op.not]: null
                    },
                    admin: false
                }
            }).then(function(user) {
                var emp = [];
                user.forEach(u => {
                    emp.push(u.empresaCliente);
                });
    
                emp = UtilService.orderByName(emp);
                empresas = JSON.parse(JSON.stringify(emp, null, 2));
            });
    
            return res.status(200).render('./admin/documentos/solicitacao/novo', { 
                layout: false, 
                empresas: empresas, 
                solicitacao: solicitacao
            });
            
        } catch (error) {
            return res.status(400).send({
                status: 'error',
                message: error
            });
        }
    },
    
    async historico(req, res) {

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

        return res.status(200).render('./admin/documentos/historico/modal_historico', { 
            layout: false, 
            historicos: historicos
        });
    },

    async click_tab_documentos(req, res) {
        return res.status(200).render('./admin/documentos/solicitacao/etapa_documentos', { 
            layout: false 
        })
    },

    async store_solicitacao(req, res) {

        const { solicitacoes_id, empresas_id, descricao } = req.body;
        var solicitacao_return;
        var razaoSocial;
        var message = '';

        try {

            message = fieldsValidate(empresas_id, descricao);
            if (message !== '') {
                throw message;
            }

            await Empresa.findByPk(empresas_id).then(function(emp) {
                razaoSocial = emp.razao;
            });
    
            await Solicitacao.findOne({ where: { id: solicitacoes_id } })
                .then(async function (obj) {
                    if (obj) {
    
                        if (obj.empresaId != empresas_id || obj.descricao != descricao) {
                            obj.update({
                                empresaId: +empresas_id,
                                descricao: descricao,
                            }).then(function(solic) {
                                Historico.create({
                                    data_hora: new Date(),
                                    empresa: razaoSocial,
                                    descricao: solic.descricao,
                                    status: solic.status,
                                    solicitacaoId: solic.id
                                })
                            });
                        }
    
                    } else {
    
                        var status = StatusEnum.DIGITACAO.descricao;
    
                        await Solicitacao.create({
                            empresaId: +empresas_id,
                            status: status,
                            descricao: descricao
                        }).then(function(solic) {
                            solicitacao_return = JSON.parse(JSON.stringify(solic, null, 2));
    
                            Historico.create({
                                data_hora: new Date(),
                                empresa: razaoSocial,
                                descricao: solic.descricao,
                                status: solic.status,
                                solicitacaoId: solic.id
                            })
                        });
                    }
                })
    
            return res.status(200).render('./admin/documentos/solicitacao/etapa_documentos', { 
                layout: false, solicitacao: solicitacao_return, message: message 
            });
            
        } catch (error) {
            if (message === '') {
                error = error.errors[0].message
            }

            return res.status(400).send({
                status: 'error',
                message: error
            });
        }
    },

    async delete_modal(req, res) {
        var solicitacao = await Solicitacao.findByPk(req.params.solicitacaoId);

        solicitacao.descricao = UtilService.textTruncate(solicitacao.descricao, 30);
    
        return res.status(200).send({
            status: true,
            solicitacao: solicitacao
        })
    },

    async delete(req, res) {

        const id  = req.body.id;

        await Solicitacao.findByPk(id)
        .then(async function (solic) {

            const solicitado = StatusEnum.SOLICITADO.descricao;
            const atendido = StatusEnum.ATENDIDO.descricao;
            const finalizado = StatusEnum.FINALIZADO.descricao;

            var notDestroy = [solicitado, atendido, finalizado];

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
        var razaoSocial;
        var solicitacao;

        try {
            //var solicitacao = await Solicitacao.findByPk(solicitacoes_id );
            var array = []

            var solicitacao = await Solicitacao.findByPk(solicitacoes_id);
            await SolicitacaoDocumentos.findAll({
                include: [{model: Documento, as: 'documento'}],
                where: {solicitacaoId: solicitacoes_id}
            }).then(sd => {
                if (sd.length < 1) {
                    throw 'Adicione ao menos um documento'
                }
            });

            var emrpesaId = solicitacao.empresaId;

            await Empresa.findByPk(emrpesaId).then(function(emp) {
                razaoSocial = emp.razao;
            });

            await solicitacao.update({
                status: status,
                dt_solicitado: Date.now()
            }).then(function(solic) {
                Historico.create({
                    data_hora: new Date(),
                    empresa: razaoSocial,
                    descricao: solic.descricao,
                    status: solic.status,
                    solicitacaoId: solic.id
                })
            });

            return res.status(200).send({
                status: true,
                message: "Solicitação concluída com sucesso!"
            });
            
        } catch (error) {
            return res.status(400).send({
                status: true,
                message: error
            });
        }

        
    },

    async store_solicitacoes_documentos(req, res) {

        const { solicitacoes_id, solicitacoes_doc } = req.body;
        var solicitacao;
        var documentoAdicionado = false;

        await Solicitacao.findByPk(solicitacoes_id).then(function (solic) {
            solicitacao = JSON.parse(JSON.stringify(solic, null, 2));
        });

        var solic_ids;
        if (solicitacoes_doc) {
            solic_ids = solicitacoes_doc.split(",");
        }

        var ano = new Date().getFullYear();

        if (solic_ids) {
            solic_ids.forEach(async function (id, i) {
                await SolicitacaoDocumentos.create({
                    solicitacaoId: solicitacao.id,
                    documentoId: id,
                    ano: ano
                })
            }); 
            
            documentoAdicionado = true;
        }

        return res.status(200).send({
            status: true,
            docAdd: documentoAdicionado,
            msg: "Documentos inseridos com sucesso"
        });
    },

    async edit_solcicitacoes_documentos(req, res) {
        var solicitacao_doc;
    
        await SolicitacaoDocumentos.findByPk(req.params.id).then(function(solicdoc) {
            solicitacao_doc = JSON.parse(JSON.stringify(solicdoc, null, 2));
        });

        var anos = UtilService.getAnos();
    
        return res.status(200).render('./admin/documentos/solicitacao/modal_edit_solicitacoes_doc', { 
            layout: false, solicitacao_doc: solicitacao_doc, anos: anos 
        });
    },

    async destroy_solcicitacoes_documentos(req, res) {

        const id  = req.body.id;
        
        await SolicitacaoDocumentos.destroy({
            where: {
                id: id
            }
        });
        
        var count = await SolicitacaoDocumentos.findAndCountAll({
            where: {
                id: id
            }
        })
        
        return res.status(200).send({
            status: 1,
            message: 'Deletado com sucesso!',
            count: count.count
        })
    },

    async modal_adicionar_documentos(req, res) {
        var solicitacaoId = req.params.solicitacaoId;

        res.render('./admin/documentos/solicitacao/modal_cadastrar_documentos', { 
            solicitacaoId: solicitacaoId, layout: false 
        });
    },

    async show_solicitacoes_documentos(req, res) {

        var solicitacoes_documentos;

        await SolicitacaoDocumentos.findAll({
            subQuery: false,
            include:  [{ model: Documento, as: 'documento' }],
            where: { solicitacaoId: req.query.solicitacoes_id }
        }).then(function (solic) {
            solicitacoes_documentos = JSON.parse(JSON.stringify(solic, null, 2));
        });

        return res.status(200).send({
            status: true,
            data: solicitacoes_documentos
        })
    },

    async solicitacao_index(req, res) {

        const empresaId = req.user.empresaCliente.id;
        const status = StatusEnum.SOLICITADO.descricao;
        var solicitacoes;

        await Solicitacao.findAll({
            include: [{model: SolicitacaoDocumentos, as: 'documento'}],
            where: { 
                empresaId:  empresaId,
                status: status
            }
        }).then(solic => {
            solicitacoes = JSON.parse(JSON.stringify(solic, null, 2));
            solicitacoes.forEach(item => {
                item.dt_solicitado = UtilService.dateFormat(new Date(item.dt_solicitado));
            });
        });

        return res.status(200).render('./solicitacao', 
            { solicitacoes: solicitacoes }
        );
    },
    

}