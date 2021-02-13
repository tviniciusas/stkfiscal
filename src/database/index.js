const Sequelize = require('sequelize');

const dbconfig = require("../config/database.js");

const User = require('../models/User');
const Empresa = require('../models/Empresa');

const connection = new Sequelize(dbconfig);

User.init(connection);
Empresa.init(connection);


module.exports = connection;