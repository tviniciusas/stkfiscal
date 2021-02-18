if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const handlebars = require('express-handlebars');
const routes = require("./routes");
const flash = require('express-flash')
const session = require('express-session');
const passport = require('passport');

require('./database')

const app=express();
app.use(express.json());
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())


app.engine("handlebars",handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false}))

app.use('/css', express.static('css'))
app.use('/js', express.static('js'))
app.use('/img', express.static('img'))
app.use('/plugins', express.static('plugins'))

app.use(routes);

app.listen(3000, function(req, res) {
    console.log('Servidor está rodando')
})



