const { create, sequelize } = require('sequelize/lib/model');
const Documento = require('../models/Documento');
const Empresa = require('../models/Empresa');
const Solicitacao = require('../models/Solicitacao');
const SolicitacaoDocumentos = require('../models/SolicitacaoDocumentos');


module.exports = {

    async index(req, res) {
        res.render('./admin/documentos/solicitacao/index')
    },

    async show_solicitacoes(req, res) {

        console.log('chegando')

        var solicitacoes;

        await Solicitacao.findAll({
            include: { association: 'empresa' },
        }).then(function (solic) {
            solicitacoes = JSON.parse(JSON.stringify(solic, null, 2));
        });

        console.log(solicitacoes);

        return res.status(200).send({
            status: true,
            data: solicitacoes
        })
    },

    async create(req, res) {

        await Empresa.findAll().then(function (emp) {
            empresas = JSON.parse(JSON.stringify(emp, null, 2));
        });

        res.render('./admin/documentos/solicitacao/novo', { layout: false, empresas: empresas })
    },

    async edit(req, res) {

        var solicitacao, empresas;

        await Solicitacao.findOne({
            where: { id: req.params.id }
        }).then(function (solic) {
            solicitacao = JSON.parse(JSON.stringify(solic, null, 2));
        });

        await Empresa.findAll().then(function (emp) {
            empresas = JSON.parse(JSON.stringify(emp, null, 2));
        });

        return res.status(200).render('./admin/documentos/solicitacao/novo', { layout: false, empresas: empresas, solicitacao: solicitacao });
    },

    async store_solicitacao(req, res) {

        const { solicitacoes_id, empresas_id, descricao } = req.body;

        var solicitacao_return

        await Solicitacao.findOne({ where: { id: solicitacoes_id } })
            .then(async function (obj) {
                if (obj) {

                    console.log('1')

                    if (obj.empresas_id != empresas_id || obj.descrição != descricao) {
                        obj.update({
                            "empresas_id": empresas_id,
                            "descrição": descricao,
                        });
                    }

                } else {

                    console.log('2')

                    solicitacao_return = await Solicitacao.create({
                        "empresas_id": empresas_id,
                        "status": "DIGITAÇÃO",
                        "descrição": descricao,
                    });

                    solicitacao_return = JSON.parse(JSON.stringify(solicitacao_return, null, 2));
                }
            })

            console.log(solicitacao_return);

        return res.status(200).render('./admin/documentos/solicitacao/etapa_documentos', { layout: false, solicitacao: solicitacao_return })

    },

    async finalizar_solicitacao(req, res) {

        const { solicitacoes_id } = req.body;

        await Solicitacao.findOne({ where: { id: solicitacoes_id } }).then(function (solic) {
            solic.update({
                "status": "FINALIZADO",
                "dt_solicitado": Date.now()
            });
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

        solic_ids.forEach(async function (id, i) {
            await SolicitacaoDocumentos.create({
                "solicitacoes_id": solicitacao.id,
                "documentos_id": id,
                "ano": "2021"
            })
        });

        return res.status(200).send({
            status: true,
            msg: "Documentos inseridos com sucesso"
        })
    },

    async modal_adicionar_documentos(req, res) {
        res.render('./admin/documentos/solicitacao/modal_cadastrar_documentos', { layout: false })
    },

    async show_solicitacoes_documentos(req, res) {

        var solicitacoes_documentos;

        console.log(req.query.solicitacoes_id);

        await SolicitacaoDocumentos.findAll({
            include: { association: 'documento' },
            where: { solicitacoes_id: req.query.solicitacoes_id }
        }).then(function (solic) {
            solicitacoes_documentos = JSON.parse(JSON.stringify(solic, null, 2));
        });

        console.log(solicitacoes_documentos);


        return res.status(200).send({
            status: true,
            data: solicitacoes_documentos
        })
    },
}