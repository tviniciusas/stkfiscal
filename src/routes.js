const express = require('express');

const UserController = require('./controllers/UserController')
const EmpresaController = require('./controllers/EmpresaController')

const router = express.Router();

router.get("/", function(req, res) {
    res.render('index');
})

router.get("/user", UserController.index);

router.get("/empresa", EmpresaController.index);

router.post("/empresa", EmpresaController.store);

router.put("/empresa/:idemp", EmpresaController.update);
router.delete("/empresa/:idemp", EmpresaController.delete);



module.exports = router;