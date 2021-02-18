const express = require('express');

const UserController = require('./controllers/UserController')
const EmpresaController = require('./controllers/EmpresaController')
const LoginController = require('./controllers/LoginController');
const passport = require('passport');

const router = express.Router();

router.get("/", checkAuthenticated, (req, res) => {res.render('index', {name: req.user.name});})

//=== Rotas Login ===//
router.get("/register", LoginController.register);
router.get("/login",LoginController.login)
router.post("/login", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))

//=== Rotas Usuarios ===//
router.get("/user", UserController.index);
router.post("/user",  UserController.store);
router.put("/user/:user_id", UserController.update);
router.delete("/user/:user_id", UserController.delete);

//=== Rotas Empresa ===//
router.get("/empresa", EmpresaController.index);
router.post("/empresa", EmpresaController.store);
router.put("/empresa/:idemp", EmpresaController.update);
router.delete("/empresa/:idemp", EmpresaController.delete);

function checkAuthenticated(req, res, next) {

    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}


module.exports = router;