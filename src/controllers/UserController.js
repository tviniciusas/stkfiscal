const User = require('../models/User.js')
const Empresa = require('../models/Empresa');
const SendMailService = require('../services/SendMailService');
const bcrypt = require('bcrypt');

module.exports =  {

    async index(req, res) {
        const users = await User.findAll();
        // if(users == '' || users == null) {
        //     return res.status(200).send({message: "Nenhum usuário cadastrado"});
        // }
        return res.status(200).send({users});
    },

    async index_admin(req, res) {
        const empresaId = req.user.empresaId;
        var usuarios;

        await User.findAll({
            subQuery: false,
            include:  [
                { model: Empresa, as: 'empresa' },
                { model: Empresa, as: 'empresaCliente' }
            ],
            where: {
                empresaId: empresaId,
                admin: false
            },
            order: [
                ['name', 'ASC']
            ]
        }).then(function(users) {
            usuarios = JSON.parse(JSON.stringify(users, null, 2));
        });

        res.render('./admin/usuarios/index', { 
            usuarios: usuarios
        });
    },

    async store(req, res) {
        
        try {
            const users = await ({nome,razao})

            if(users) {
                res.status(400).send({status: false, msg: "E-mail já cadastrado."});     
            }
            
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const password = hashedPassword;
            const email = req.body.email;
            const user = await User.create({password,email});

            res.redirect('/login')
        
        } catch (error) {                
            res.status(400).send({status: false, msg: error});     
        }
    },

    async storeUserMail(req, res, next) {
        const name = req.body.name;
        const email = req.body.email;
        const empresa_id = req.user.empresaId;
        var message = 'Falha ao atualizar usuário';

        try {

            if (!name.trim()) {
                message = 'O campo Nome é obrigatório.';
                throw message;
            }

            if (!email.trim()) {
                message = 'O campo E-mail é obrigatório.';
                throw message;
            }

            const findMail = await User.findOne({where: {email: email}});
            if(findMail) {
                message = 'E-mail já cadastrado.';
                throw message;  
            }

            const hashedPassword = await bcrypt.hash('mudarsenha', 10)
            const password = hashedPassword;

            await User.create({
                name: name, 
                password: password, 
                email: email, 
                empresaId: empresa_id
            }).then(function(data) {
                SendMailService.sendMail(name, email);
                message = 'Dados alterados com sucesso';

                return res.status(200).send({
                    status: 'success',
                    message: message
                })
            });
            
        } catch (error) {  
            return res.status(500).send({
                status: 'error',
                message: message
            })
            // var error_msg = error.errors ? error.errors[0].message : error;
            // req.flash('error_msg', error_msg);
            // res.redirect('admin/usuarios');          
            //res.status(400).send({status: false, msg: error});     
        }
    },

    async update(req, res) {
        const {name, password, email} = req.body;
        const { user_id } = req.params;
        
        await User.update({name,password,email}, {where: {id: user_id}});
        return res.status(200).send({status: true, msg: "Dados atualizados com sucesso."});
    },

    async edit_admin(req, res) {
        var usuario = await User.findByPk(req.params.id);
    
        return res.status(200).send({
            status: true,
            usuario: usuario
        })
    },
    
    async update_admin(req, res) {
        const user_id = req.query.usuarioId;
        const name = req.query.name;
        const email = req.query.email;
        var message = 'Falha ao atualizar usuário';

        try {

            if (name === null || name === '') {
                message = 'O campo Nome é obrigatório.';
                throw message;
            }

            if (email === null || email === '') {
                message = 'O campo E-mail é obrigatório.';
                throw message;
            }

            const usuario = await User.findByPk(user_id);
            if (usuario && usuario.empresaClienteId) {
                message = "Não é posível atualizar os dados deste usuário, pois o mesmo já atualizou seus dados."; 
                throw message;
            }

            const findMail = await User.findOne({where: {email: email}});
            if(findMail && findMail.id !== +user_id) {
                message = "E-mail já cadastrado."; 
                throw message;
            }

            await User.update({
                name: name, 
                email: email
            }, {
                where: {
                    id: user_id
                }
            }).then(function(data) {
                SendMailService.sendMail(name, email);
                message = 'Dados alterados com sucesso';

                return res.status(200).send({
                    status: 'success',
                    message: message
                })
            });
            
        } catch (error) {  
            return res.status(500).send({
                status: 'error',
                message: message
            })  
        }
    },

    async delete_modal(req, res) {
        var usuario = await User.findByPk(req.params.user_id);
    
        return res.status(200).send({
            status: true,
            usuario: usuario
        })
    },

    async delete(req, res) {
        const { user_id } = req.params;
        
        await User.destroy({where: {id: user_id}});
        return res.status(200).send({status: true, msg: "Usuário deletado com sucesso."});
    },
    
    async delete_admin(req, res) {
        const user_id = req.body.usuarioId;
        
        await User.destroy({where: {id: user_id}});
        return res.status(200).send({status: true, msg: "Usuário deletado com sucesso."});
    }

}