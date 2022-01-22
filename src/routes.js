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
const UploadController = require('./controllers/UploadController');
const DocumentosSolicitacoes = require('./controllers/DocumentosSolicitacoes');
const HistoricoController = require('./controllers/HistoricoController');

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

// router.get("/upload", (req,res) => {

//     res.render('upload');
// })
router.get("/upload", UploadController.index);
router.post('/upload', upload.single('file'), UploadController.store)
//router.post('/upload', upload.array('file', 10), UploadController.store);

router.delete("/logout", checkAuthenticated, LoginController.logout);
router.use(checkAuthenticated);

//=== Rotas Home ===//
router.get("/", (req, res) => {
    res.render('index');
})

//=== Rotas Usuarios ===//
router.get("/user", UserController.index);
router.post("/user", UserController.store);
router.post("/usercad", UserController.storeUserMail);
router.put("/user/:user_id", UserController.update);
router.delete("/user/:user_id", UserController.delete);

//=== Rotas Empresa ===//
router.get("/empresa", EmpresaController.index);
router.post('/empresa/buscar', EmpresaController.search);
router.post("/empresa/municipios", EmpresaController.county);
router.post("/empresa", EmpresaController.store);
router.put("/empresa/:idemp", EmpresaController.update);
router.delete("/empresa/:idemp", EmpresaController.delete);

//=== Rotas Admin ===//
router.use("/admin", isAdmin);

//=== Rotas Admin Documentos Cadastro ===//
router.get("/admin/documentos/cadastro", DocumentoController.index);
router.get("/admin/documentos/cadastro/edit/:id", DocumentoController.edit);
router.get("/admin/documentos/cadastro/show_documentos", DocumentoController.show_documentos);
router.get("/admin/documentos/cadastro/show_documentos_modal/:solicitacaoId", DocumentoController.show_documentos_modal);
router.post("/admin/documentos/cadastro", DocumentoController.store);
router.delete("/admin/documentos/cadastro", DocumentoController.delete);
router.post("/admin/documentos/totalRegistros", DocumentoController.totalRegistros);

router.get("/admin/documentos/solicitacao", DocumentosSolicitacoes.index);
router.get("/admin/documentos/solicitacao/show_solicitacoes", DocumentosSolicitacoes.show_solicitacoes);
router.get("/admin/documentos/solicitacao/create", DocumentosSolicitacoes.create);
router.delete("/admin/documentos/solicitacao", DocumentosSolicitacoes.delete);

router.get("/admin/documentos/solicitacao/show_solicitacoes_documentos", DocumentosSolicitacoes.show_solicitacoes_documentos);
router.get("/admin/documentos/solicitacao/modal_adicionar_documentos/:solicitacaoId", DocumentosSolicitacoes.modal_adicionar_documentos);
router.post("/admin/documentos/solicitacao/store_solicitacao", DocumentosSolicitacoes.store_solicitacao);
router.post("/admin/documentos/solicitacao/click_tab_documentos", DocumentosSolicitacoes.click_tab_documentos);
router.post("/admin/documentos/solicitacao/store_solicitacoes_documentos", DocumentosSolicitacoes.store_solicitacoes_documentos);
router.post("/admin/documentos/solicitacao/finalizar_solicitacao", DocumentosSolicitacoes.finalizar_solicitacao);
router.get("/admin/documentos/solicitacao/edit/:id", DocumentosSolicitacoes.edit);
router.get("/admin/documentos/solicitacao/historico/:id", DocumentosSolicitacoes.historic);
router.get("/admin/documentos/solicitacao/edit_solcicitacoes_documentos/:id", DocumentosSolicitacoes.edit_solcicitacoes_documentos);
router.delete("/admin/documentos/solicitacao/destroy_solcicitacoes_documentos", DocumentosSolicitacoes.destroy_solcicitacoes_documentos);


router.get("/admin/documentos/solicitacao", (req, res) => {
    res.render('./admin/documentos/solicitacao')
});

router.get("/admin/documentos/historico", HistoricoController.index);
router.get("/admin/documentos/show_historico/:solicitacaoId", HistoricoController.show_historico);

router.get("/admin/usuarios", UserController.index_admin);
router.get("/admin/usuarios/edit/:id", UserController.edit_admin);
router.get("/admin/usuarios/update", UserController.update_admin);
router.get("/user/delete/:user_id", UserController.delete_modal);
router.delete("/admin/usuarios/delete", UserController.delete_admin);

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