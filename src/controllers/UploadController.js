const Upload = require('../models/Upload.js');
const file = require('../config/Upload');
const User = require('../models/User.js');
const UtilService = require('../services/UtilService.js');

function fieldsValidate(mes, ano) {
    var msg = '';

    if (mes === null || mes === '') {
        msg = 'O campo Mês é obrigatório';
    }
    else if (ano === null || ano === '') {
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

    }
}


