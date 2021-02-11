const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app=express();

app.engine("handlebars",handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.use('/css', express.static('css'))
app.use('/js', express.static('js'))
app.use('/img', express.static('img'))
app.use('/plugins', express.static('plugins'))

app.get("/:id?", function(req, res) {
    //res.send("essa é a minha página inicial");
    //res.sendFile(__dirname+"/index.html")
    res.render('index', {id: req.params.id});
})

app.listen(3000, function(req, res) {
    console.log('Servidor está rodando')
})

