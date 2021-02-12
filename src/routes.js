const express = require('express');

const UserController = require('./controllers/UserController')

const router = express.Router();

router.get("/", function(req, res) {
    res.render('index');
})

router.get("/user", UserController.index);

module.exports = router;