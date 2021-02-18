const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

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
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(function(id, done){
        User.findByPk(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
}

module.exports = initialize;