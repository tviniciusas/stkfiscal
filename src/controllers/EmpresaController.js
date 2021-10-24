const bcrypt = require('bcrypt')
const Empresa = require('../models/Empresa.js');
const User = require('../models/User.js');
const ApiService = require('../services/ApiService');
const SefazDataService = require('../services/SefazDataService');
const UtilService = require('../services/UtilService');

function fieldsValidate(empresa) {
    var msg = '';

    if (empresa.nome === null || empresa.nome === '') {
        msg = 'O campo Nome é obrigatório';
    }
    else if (empresa.razao === null || empresa.razao === '') {
        msg = 'O campo Razão Social é obrigatório';
    }
    else if (empresa.cnpj === null || empresa.cnpj === '') {
        msg = 'O campo CNPJ é obrigatório';
    }
    else if (empresa.ie === null || empresa.ie === '') {
        msg = 'O campo Inscrição estadual é obrigatório';
    }
    else if (empresa.email === null || empresa.email === '') {
        msg = 'O campo E-mail é obrigatório';
    }
    else if (empresa.telefone === null || empresa.telefone === '') {
        msg = 'O campo Telefone é obrigatório';
    }
    else if (empresa.estado === null || empresa.estado === '') {
        msg = 'O campo Estado é obrigatório';
    }
    else if (empresa.cidade === null || empresa.cidade === '') {
        msg = 'O campo Cidade é obrigatório';
    }
    
    return msg;   
} 

module.exports =  {

    async index(req, res) {
        try {
            var estados = await ApiService.getEstados();
            var cidades;
            var empresa;

            const usuario = req.user;  
            
            await Empresa.findByPk(usuario.empresas_id).then(data => {
               if (data) {
                   empresa = data.get({ plain: true });
               }
            });

            if (empresa) {
                cidades = await ApiService.getMunicipiosByEstado(empresa.estado);
                empresa.cnpj = UtilService.cnpjMask(empresa.cnpj);
                empresa.ie = UtilService.ieMask(empresa.ie);
                empresa.telefone = UtilService.telMask(empresa.telefone);
            }

            res.render('empresa', {
                empresa: empresa, estados: estados, cidades: cidades
            });
            
        } catch (error) {
            console.log(error);
        }
    },

    async search(req, res) {
        try {
            const sefaz = await SefazDataService.getCompanyData(req.body.cnpj);
            //const userId = req.body.userId;

            return res.status(200).send({
                status: 1,
                sefaz,
                //userId
            })
        } catch (error) {
            console.log(error);
        }
    },

    async county(req, res) {
        try {
            const estado = req.body.estado;
            var municipios = [];

            if (estado != '') {
                municipios = await ApiService.getMunicipiosByEstado(estado);
            }

            return res.status(200).send({
                status: 1,
                municipios
            })
        } catch (error) {
            console.log(error);
        }
    },

    async store(req, res) {
        const empresaTemp = { 
            nome: req.body.nome,
            razao: req.body.razao, 
            cnpj: req.body.cnpj, 
            ie: req.body.ie, 
            telefone: req.body.telefone, 
            email: req.body.email,
            estado: req.body.estado, 
            cidade: req.body.cidade 
        };
        
        var estados;
        var cidades;
        var empresa;
        var password = '';
        var usuario = req.user;
        
        try {
            estados = await ApiService.getEstados();
            cidades = await ApiService.getMunicipiosByEstado(empresaTemp.estado);

            const error = fieldsValidate(empresaTemp);
            if (error != '') {
                throw error;
            }

            if (req.body.senha && req.body.confirmarSenha) {
                password = await bcrypt.hash(req.body.confirmarSenha, 10);
            }

            const cnpj = UtilService.onlyNumbers(empresaTemp.cnpj);
            await Empresa.findOne({
                where: {
                    cnpj: cnpj
                }
            }).then(data => {
                if (data) {
                    empresa = data.get({ plain: true });
                }
            });

            const { nome, razao, email, estado, cidade } = empresaTemp;
            const ie = UtilService.onlyNumbers(empresaTemp.ie);
            const telefone = UtilService.onlyNumbers(empresaTemp.telefone);

            if (empresa) {
                await Empresa.update(
                    { nome, razao, cnpj, ie, telefone, email, estado, cidade },
                    { where: {id: empresa.id} }
                ).catch(err => {
                    throw err;
                });
            }
            else {
                empresa = await Empresa.create({ 
                    nome, razao, cnpj, ie, telefone, email, estado, cidade
                }).catch(err => {
                    throw err;
                });
            }
            
            await User.update({
                password: password,
                empresas_id: empresa.id 
            }, {
                where: {id: usuario.id}
            }).catch(err => {
                throw err;
            });

            if (empresa) {
                empresa.cnpj = UtilService.cnpjMask(empresa.cnpj);
                empresa.ie = UtilService.ieMask(empresa.ie);
                empresa.telefone = UtilService.telMask(empresa.telefone);
            }
            
            var success_msg = 'Empresa cadastrada com sucesso';
            req.flash('success_msg', success_msg);
            res.status(200).render('empresa', {
                empresa,
                estados,
                cidades,
                success_msg
            });
        } catch (error) {
            var error_msg = error.errors ? error.errors[0].message : error;
            var empresa = empresaTemp;
            //console.log('error: usuario.id: ', usuario.id);
            req.flash('error_msg', error_msg);
            res.status(400).render('empresa', {
                empresa,
                estados,
                cidades,
                error_msg
            });
        }
    },

    async update(req, res) {

        const { nome, razao, cnpj, ie, telefone, email, estado, cidade } = req.body;
        const { idemp } = req.params;
        
        await Empresa.update({ nome, ie, estado, cidade, telefone 
        }, {
            where: {
                id: idemp
            }
        });
        return res.status(200).send({
            status: 1,
            message: 'Empresa atualizada com sucesso!',
        })
    },

    async delete(req, res) {

        const { idemp } = req.params;

        await Empresa.destroy({
                where: {
                    id: idemp
                }
        });
        return res.status(200).send({
            status: 1,
            message: 'Deletado com sucesso!'
        })
    }
}