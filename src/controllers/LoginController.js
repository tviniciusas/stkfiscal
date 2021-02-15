const passport = require('passport');
const User = require('../models/User.js');

const initializePassport = require('../config/passport');

initializePassport(passport)

module.exports = {
    async register(req, res) {
        res.render('register', {layout: false});
    },

    async login(req, res) {
        res.render('login', {layout: false});
    }
}