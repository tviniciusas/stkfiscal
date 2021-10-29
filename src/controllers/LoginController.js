const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const Empresa = require('../models/Empresa.js');
const UtilService = require('../services/UtilService');
const initializePassport = require('../config/passport');
initializePassport(passport)

module.exports = {
    async register(req, res) {
        res.render('register', {layout: false});
    },

    async login(req, res) {
        res.render('login', {layout: false});
    },

    async logout(req, res) {
        req.logOut();
        res.redirect('/login');
    },

    async store(req, res, next) {
        const cnpjTemp = req.body.cnpj;
        const razao = req.body.razao_social;
        const email = req.body.email;
        var cnpj = UtilService.onlyNumbers(cnpjTemp);

        try {
        
            const users = await User.findOne({where: {email: req.body.email}});
            
            if(req.body.razao_social === "") {
                throw 'O campo Razão Social é obrigatório.'  
            }

            if(req.body.email === "") {
                throw 'O campo E-mail é obrigatório.'  
            }

            if(req.body.cnpj === "") {
                throw 'O campo CNPJ é obrigatório.'   
            }

            if(users) {
                throw 'E-mail já cadastrado.' 
            }

            if(req.body.password !== req.body.password_confirmation) {
                throw 'As senhas informadas não coincidem.'   
            }
            
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const empresa = await Empresa.create({razao, cnpj, email});
            const password = hashedPassword;
            const empresaId = empresa.id;
            const admin = true;

            const user = await User.create({email, admin, password, empresaId});

            res.redirect('/login')
        
        } catch (error) { 
            var error_msg = error.errors ? error.errors[0].message : error;
            req.flash('error', error_msg);
            console.log(error_msg);
            return res.redirect('/register');
            //res.status(400).render('register', {status: false, msg: error_msg});     
        }
    },

    async updatemail(req, res) {
        var error_msg = '';

        try {
            const email = req.params.email
            if(req.body.password !== req.body.password_confirmation) {
                error_msg = "As senhas informadas não coincidem";
                req.flash("error", error_msg);  
                return res.redirect('/register')     
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const password = hashedPassword;

            const user = await User.update({password : password} ,{
                where: {
                    email: email
                }
            });

            res.redirect('/login')
        
        } catch (error) { 
            console.log(error);
            res.status(400).send({status: false, msg: error_msg});     
        }
    }
}