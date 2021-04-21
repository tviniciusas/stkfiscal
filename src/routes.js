const User = require('./models/User');
const Documento = require('./models/Documento');
const express = require('express');
const upload = require('./config/upload')
const UserController = require('./controllers/UserController')
const EmpresaController = require('./controllers/EmpresaController')
const LoginController = require('./controllers/LoginController');
const passport = require('passport');
const DocumentoController = require('./controllers/DocumentoController');
const path = require('path');
const uploadController = require('./controllers/uploadController');
const companyRegister = require('./config/companyRegister')
const transporter = require('./config/emailSend')


const router = express.Router();

//=== Rotas Login ===//
router.get("/register", checkNotAuthenticated, LoginController.register);
router.post("/register", checkNotAuthenticated, LoginController.store);
router.get("/login", checkNotAuthenticated, LoginController.login)
router.post("/login", checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    badRequestMessage: 'Insira um usuário válido.',
}));

router.get('/list', (req,res)=> {
    res.send('listar')
})

router.get("/upload",  (req,res) => {

    res.render('upload');
})

// router.post('/upload',  upload.single('file'), (req, res) => {

//     console.log(req.file)
// })

//== Rota cadastar empresa == //
router.get('/cadauto/:id', companyRegister.registerCompany)

router.post('/upload', upload.single('file'), uploadController.store)

router.get('/sendEmail', checkNotAuthenticated, (req, res) => {

    res.render('updatepass')

    // transporter.sendMail({
    //     from: "<thiago@masconsultoria.com.br>", 
    //     to: "tviniciusas@gmail.com ", 
    //     subject: "Finalize seu cadastro i-store.duckdns.org ", 
    //     text: "Obrigado por se cadastrar em nossa plataforma", 
    //     html: "<h1><b>Click no link abaixo para completar seu cadastro</b></h1><br><a href='http://i-store.duckdns.org/login'><button>Finalizar Cadastro</button></a>", 
    //   }).then(info => {
    //       res.send('Email sent')
    //   }).catch(e => {
    //       console.log('erro ao enviar e-mail '+ e)
    //   })
})


router.delete("/logout", checkAuthenticated, LoginController.logout);
router.use(checkAuthenticated);

//=== Rotas Home ===//
router.get("/", (req, res) => {
    res.render('index');
})

//=== Rotas Usuarios ===//
router.get("/user", UserController.index);
router.post("/user", UserController.store);
router.put("/user/:user_id", UserController.update);
router.delete("/user/:user_id", UserController.delete);

//=== Rotas Empresa ===//
router.get("/empresa", EmpresaController.index);
router.post("/empresa", EmpresaController.store);
router.put("/empresa/:idemp", EmpresaController.update);
router.delete("/empresa/:idemp", EmpresaController.delete);

//=== Rotas Admin ===//
router.use("/admin", isAdmin);

//=== Rotas Admin Documentos Cadastro ===//
router.get("/admin/documentos/cadastro", DocumentoController.index);
router.get("/admin/documentos/cadastro/edit/:id", DocumentoController.edit);
router.get("/admin/documentos/cadastro/show_documentos", DocumentoController.show_documentos);
router.post("/admin/documentos/cadastro", DocumentoController.store);
router.delete("/admin/documentos/cadastro", DocumentoController.delete);

router.get("/admin/documentos/solicitacao", (req, res) => {
    res.render('./admin/documentos/solicitacao')
});

router.get("/admin/documentos/historico", (req, res) => {
    res.render('./admin/documentos/historico')
});

router.get("/admin/usuarios", (req, res) => {
    res.render('./admin/usuarios')
});

//=== Função middlewer's ===//

function checkAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

function isAdmin(req, res, next) {
    if (req.user.admin) {
        next();
    } else {
        req.logOut();
        res.redirect('/login');
    }
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}



module.exports = router;