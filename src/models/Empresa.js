const { Model, DataTypes } = require('sequelize');
const User = require('./User');

class Empresa extends Model {
    static init(sequelize) {
      super.init({
        nome: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
            max: 200
          }
        },
        razao: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O campo Razão social é obrigatório'
            },
            notEmpty: {
              msg: 'O campo Razão social é obrigatório'
            },
            max: 200
          }
        },
        cnpj: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O campo CNPJ é obrigatório'
            },
            notEmpty: {
              msg: 'O campo CNPJ é obrigatório'
            },
            isNumeric: true,
            len: {
              args: [14, 14],
              msg: 'CNPJ inválido'
            }
          }
        },
        ie: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
            isNumeric: true,
            len: {
              args: [9, 9],
              msg: 'Inscrição estadual inválida'
            }
          }
        },
        telefone: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
            isNumeric: true,
            len: {
              args: [10, 12],
              msg: 'Telefone inválido'
            }
          }
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notNull: {
              msg: 'O campo E-mail é obrigatório'
            },
            notEmpty: {
              msg: 'O campo E-mail é obrigatório'
            },
            isEmail: {
              msg: 'E-mail inválido'
            },
            max: 50
          }
        },
        estado: {
          type: DataTypes.STRING,
          allowNull: true
        },
        cidade: {
          type: DataTypes.STRING,
          allowNull: true
        },
      }, { sequelize })
    }
}

module.exports = Empresa;
