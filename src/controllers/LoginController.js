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
                req.flash("error","Razão social não informado");  
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
                req.flash("error","E-mail já cadastrado");  
                return res.redirect('/register')   
            }

            if(req.body.password !== req.body.password_confirmation) {
                req.flash("error","As senhas informadas não coincidem");  
                return res.redirect('/register')     
            }
            
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const razao = req.body.razao_social;
            const cnpj = req.body.cnpj;
            const email = req.body.email;
            const empresa = await Empresa.create({razao, cnpj, email});
            const password = hashedPassword;
            const empresas_id = empresa.id;
            const admin = true;

            const user = await User.create({email, admin, password, empresas_id});

            res.redirect('/login')
        
        } catch (error) { 
               
            res.status(400).send({status: false, msg: error});     
        }
    },

    async updatemail(req, res) {

        try {

            const email = req.params.email
            if(req.body.password !== req.body.password_confirmation) {
                req.flash("error","As senhas informadas não coincidem");  
                return res.redirect('/register')     
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const password = hashedPassword;

            const user = await User.update({password : password} ,{
                where: {
                    email: email
                }})

            res.redirect('/login')
        
        } catch (error) { 
               
            res.status(400).send({status: false, msg: error});     
        }
    }
}