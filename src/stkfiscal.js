const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const routes = require("./routes");

require('./database')

const app=express();

app.engine("handlebars",handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.use('/css', express.static('css'))
app.use('/js', express.static('js'))
app.use('/img', express.static('img'))
app.use('/plugins', express.static('plugins'))

app.use(routes);

app.listen(3000, function(req, res) {
    console.log('Servidor está rodando')
})

