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
              msg: 'O campo Razão social é obrigatório.'
            },
            notEmpty: {
              msg: 'O campo Razão social é obrigatório.'
            },
            min: 3,
            max: 200
          }
        },
        cnpj: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O campo CNPJ é obrigatório.'
            },
            notEmpty: {
              msg: 'O campo CNPJ é obrigatório.'
            },
            isNumeric: true,
            len: {
              args: [14, 14],
              msg: 'Por favor, insira um CNPJ válido.'
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
              msg: 'Por favor, insira uma inscrição estadual válida.'
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
              msg: 'Por favor, insira um telefone válido.'
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
              msg: 'Por favor, insira um e-mail válido.'
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

    static associate(models) {
      this.hasMany(models.User, { as: 'user' });
      this.hasMany(models.Solicitacao, { as: 'solicitacao' });
      this.hasMany(models.Upload, { as: 'upload' });
    }
}

module.exports = Empresa;