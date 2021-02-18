const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../models/User.js');
const Empresa = require('../models/Empresa.js');

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
        try {

        
            const users = await User.findOne({where: {email: req.body.email}});
            
            if(req.body.razao_social === "") {
                req.flash("error","Razaão social não informada");  
                return res.redirect('/register')    
            }

            if(req.body.email === "") {
                req.flash("error","E-mail não informado");  
                return res.redirect('/register')    
            }

            if(req.body.cnpj === "") {
                req.flash("error","CNPJ/CPF não informado");  
                return res.redirect('/register')    
            }

            if(req.body.email === "") {
                req.flash("error","E-mail não informado");  
                return res.redirect('/register')    
            }

            if(users) {
                req.flash("error","Já existe um usuário cadastrado com esse e-mail");  
                return res.redirect('/register')   
            }

            if(req.body.password !== req.body.password_confirmation) {
                req.flash("error","As senhas informadas não coincidem");  
                return res.redirect('/register')     
            }
            
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const razao = req.body.razao_social;
            const cnpj = req.body.cnpj;
        
            const empresa = await Empresa.create({razao,cnpj});

            const password = hashedPassword;
            const email = req.body.email;
            const empresas_id = empresa.id;

            const user = await User.create({password,email,empresas_id});

            res.redirect('/login')
        
        } catch (error) { 
               
            res.status(400).send({status: false, msg: error});     
        }
    }
}