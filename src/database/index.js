const Sequelize = require('sequelize');
const dbconfig = require("../config/database.js");

const User = require('../models/User');
const Empresa = require('../models/Empresa');
const Documento = require('../models/Documento');
const Upload = require('../models/Upload.js');
const Solicitacao = require('../models/Solicitacao');
const SolicitacaoDucumento = require('../models/SolicitacaoDocumento');

const connection = new Sequelize(dbconfig);

Empresa.init(connection);
User.init(connection);
Upload.init(connection);
Solicitacao.init(connection);
Documento.init(connection);
SolicitacaoDucumento.init(connection);

Empresa.associate(connection.models);
User.associate(connection.models);
Upload.associate(connection.models);
Solicitacao.associate(connection.models);
Documento.associate(connection.models);
SolicitacaoDucumento.associate(connection.models);

module.exports = connection;