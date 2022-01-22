const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const Empresa = require('../models/Empresa.js');

async function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({where: {email: email}});

        if(!user) {
            return done(null, false, {message: "Nenhum usuário encontrado com esse e-mail"});
        }
        try {
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Senha incorreta'});
            }
        } catch (e) {
            return done(e)            
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))

    passport.serializeUser(function(user, done) {done(null, user.id)});
    passport.deserializeUser(function(id, done){
        User.findByPk(id).then(async function(user) {

            var usuario = user.get();

            if (usuario.admin) {
                await Empresa.findByPk(usuario.empresaId).then(function(empresa) {
                    if(empresa) {
                        usuario.empresa = empresa.get({ plain: true });
                    }
                });
            } else {
                await Empresa.findByPk(usuario.empresaClienteId).then(function(empresa) {
                    if(empresa) {
                        usuario.empresaCliente = empresa.get({ plain: true });
                    }
                });
            }

            if (usuario) {
                done(null, usuario);
            } else {
                done(usuario.errors, null);
            }
        });
    });
}

module.exports = initialize;