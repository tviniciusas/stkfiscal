const Sequelize = require('sequelize');
const dbconfig = require("../config/database.js");

const User = require('../models/User');
const Empresa = require('../models/Empresa');
const Documento = require('../models/Documento');
const Upload = require('../models/Upload.js');

const connection = new Sequelize(dbconfig);

User.init(connection);
Empresa.init(connection);
Documento.init(connection);
Upload.init(connection);


module.exports = connection;