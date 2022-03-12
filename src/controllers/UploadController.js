const file = require('../config/upload');
const User = require('../models/User.js');
const Upload = require('../models/Upload.js');
const Empresa = require('../models/Empresa');
const Solicitacao = require('../models/Solicitacoes.js');
const SolicitacaoDocumentos = require('../models/SolicitacaoDocumentos');
const Historico = require('../models/Historico');
const StatusEnum = require('../enums/StatusEnum.js');
const UtilService = require('../services/UtilService.js');

function fieldsValidate(mes, ano) {
    var msg = '';

    if (!mes) {
        msg = 'O campo Mês é obrigatório';
    }
    else if (!ano) {
        msg = 'O campo Ano é obrigatório';
    }
    
    return msg;
}

function filesValidate(file) {
    var msg = '';

    //files.forEach(file => {
        var diretorio = file.originalname;
        var index = diretorio.lastIndexOf('.');
        var extensao = diretorio.substring(index+1);

        if (extensao !== 'pdf' && extensao !== 'doc' && extensao !== 'docx') {
            msg = 'Extensão inválida!';
        }
    //});

    return msg;
}

module.exports =  {
    
    async index(req, res) {
        const meses = UtilService.getMeses();
        const anos = UtilService.getAnos();

        res.render('upload', {meses, anos});
    },

    async store(req, res) {
        const meses = UtilService.getMeses();
        const anos = UtilService.getAnos();
        const { mes, ano } = req.body;
        const empresaId = req.user.empresaId
        const userId = req.user.id;
        const file = req.file;
        var diretorio;
        var error_msg;

        try {
            if (file === undefined) {
                error_msg = 'Nenhum arquivo selecionado';
                throw error_msg;
            }

            error_msg = fieldsValidate(mes, ano);
            if (error_msg != '') {
                throw error_msg;
            }

            error_msg = filesValidate(file);
            if (error_msg != '') {
                throw error_msg;
            }
            
            // files.forEach(async file => {
            //     diretorio = file.originalname;
    
            //     const up = await Upload.create({ diretorio, mes, ano  }).catch(e => {
            //         error_msg = 'Falha ao enviar o(s) arquivo(s). ';
            //         req.flash('error_msg', error_msg + e);
            //         res.render('upload', {meses, anos, error_msg});
            //     })
            // });

            diretorio = file.originalname;
    
            const up = await Upload.create({ 
                diretorio, mes, ano, userId, empresaId 
            }).catch(e => {
                error_msg = 'Falha ao enviar o(s) arquivo(s). ';
                console.log(e);
                req.flash('error_msg', error_msg);
                res.render('upload', {meses, anos, error_msg});
            })
            
            const success_msg = 'Arquivo enviado com sucesso!';
            req.flash('success_msg', success_msg);
            res.status(200).render('upload', {
                file,
                meses, 
                anos,
                success_msg
            });
        } catch (error) {
            error_msg = error;
            req.flash('error_msg', error_msg);
            res.status(200).render('upload', {
                file,
                meses, 
                anos,
                error_msg
            });
        }

    },

    async modal_upload(req, res) {
        const solicitacaoId = req.params.id;

        const meses = UtilService.getMeses();
        const anos = UtilService.getAnos();

        res.render('./modal_upload', { 
            solicitacaoId: solicitacaoId, meses: meses, anos: anos, layout: false 
        });
    },

    async store_modal_upload(req, res) {
        const meses = UtilService.getMeses();
        const anos = UtilService.getAnos();
        const { mes, ano, solicitacaoId } = req.body;
        const empresaId = req.user.empresaClienteId;
        const userId = req.user.id;
        const file = req.file;
        var diretorio;
        var message;
        var razaoSocial;
        var solicitacoes;

        try {

            if (file === undefined) {
                message = 'Nenhum arquivo selecionado';
                throw message;
            }

            message = fieldsValidate(mes, ano);
            if (message != '') {
                throw message;
            }

            message = filesValidate(file);
            if (message != '') {
                throw message;
            }

            await Empresa.findByPk(empresaId).then(function(emp) {
                razaoSocial = emp.razao;
            });
            
            diretorio = file.originalname;
    
            await Upload.create({ 
                diretorio, mes, ano, userId, empresaId, solicitacaoId
            }).catch(e => {
                message = 'Falha ao enviar o(s) arquivo(s). ';
                throw message;
            });

            const solicitacao = await Solicitacao.findByPk(solicitacaoId);
            const status = StatusEnum.ATENDIDO.descricao;
            var solic;

            if (solicitacao) {
                solic = await solicitacao.update({status: status, dt_atendido: new Date()});
            }

            if (solic) {
                await Historico.create({
                    data_hora: new Date(),
                    empresa: razaoSocial,
                    descricao: solic.descricao,
                    status: solic.status,
                    solicitacaoId: solic.id
                })
            }
            
            message = 'Arquivo enviado com sucesso!';

            // return res.status(200).render('./solicitacao', { 
            //     solicitacoes: solicitacoes,
            //     status: 'success',
            //     message: message
            // });

            return res.status(200).send({
                status: 'success',
                message: message
            });
        } catch (error) {
            //return res.status(400).redirect('../solicitacao');
            // return res.status(400).render('./solicitacao', { 
            //     solicitacoes: solicitacoes,
            //     status: 'error',
            //     message: message
            // });
            res.status(400).send({
                status: 'error',
                message: error
            });
        }

    }
}