if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const handlebars = require('express-handlebars');
const routes = require("./routes");
const flash = require('express-flash')
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const cors = require('cors');
require('./database')

const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 } // A sessão deve durar 5 min
}));


app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'));

app.use(flash());
app.use(function(req, res, next){
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

app.use((req, res, next) =>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})

app.engine("handlebars",handlebars({
    defaultLayout:'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'handlebars');

app.use(function (req, res, next) {
    res.locals.menu = getMenu(req.user);

    if(req.user) {
        if(req.user.admin) {
            res.locals.user_name = 'Administrador iStok';
        } else {
            //casdias
            //res.locals.user_name = req.user.empresa.razao;
            res.locals.empresa = req.user.empresa;
        }

        res.locals.user_model = req.user;
    }
    next();
});

function getMenu(user) {

    if(user) {
        if(user.admin) {
            return 'admin_menu';
        } else {
            return 'user_menu';
        }   
    }
};

app.use(express.urlencoded({ extended: false}))
app.use('/css', express.static('css'))
app.use('/js', express.static('js'))
app.use('/img', express.static('img'))
app.use('/plugins', express.static('plugins'))

app.use(routes);


app.listen(3000,  (req, res) => {
    console.log(`** Servidor rodando em http://localhost:3000/ **`);
})



