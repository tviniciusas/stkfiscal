const User = require('./models/User');
const Documento = require('./models/Documento');

const express = require('express');

const UserController = require('./controllers/UserController')
const EmpresaController = require('./controllers/EmpresaController')
const LoginController = require('./controllers/LoginController');
const passport = require('passport');
const DocumentoController = require('./controllers/DocumentoController');
const path = require('path');

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


router.delete("/logout", checkAuthenticated, LoginController.logout);

router.use(checkAuthenticated);

//=== Rotas Home ===//
router.get("/", (req, res) => {
    res.render('index');
})

router.get("/modal/:id", async (req, res) => {

    var documento;

    await Documento.findByPk(req.params.id).then(function(docs) {
        documento = JSON.parse(JSON.stringify(docs, null, 2));
    });

    return res.status(200).send({
        status: true,
        dados: documento
    })
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

router.get("/admin/documentos/cadastro", DocumentoController.index);
router.get("/admin/documentos/show_documentos", DocumentoController.show_documentos);
router.post("/admin/documentos/store", DocumentoController.store);

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