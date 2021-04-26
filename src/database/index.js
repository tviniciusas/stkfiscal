const Sequelize = require('sequelize');
const dbconfig = require("../config/database.js");

const User = require('../models/User');
const Empresa = require('../models/Empresa');
const Documento = require('../models/Documento');
const Upload = require('../models/Upload.js');
const Solicitacao = require('../models/Solicitacao')
const SolicitacaoDocumentos = require('../models/SolicitacaoDocumentos');
const { associate } = require('../models/SolicitacaoDocumentos');

const connection = new Sequelize(dbconfig);

User.init(connection);
Empresa.init(connection);
Solicitacao.init(connection);
Documento.init(connection);
Upload.init(connection);
SolicitacaoDocumentos.init(connection);

SolicitacaoDocumentos.associate(connection.models)
Solicitacao.associate(connection.models)
Documento.associate(connection.models)
Empresa.associate(connection.models)





module.exports = connection;