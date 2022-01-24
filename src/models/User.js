const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
          name: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              max: 200
            }
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              notNull: {
                msg: 'O campo E-mail é obrigatório.'
              },
              notEmpty: {
                msg: 'O campo E-mail é obrigatório.'
              },
              isEmail: {
                msg: 'Por favor, insira um e-mail válido.'
              },
              max: 50
            }
          },
          admin: {
              type: DataTypes.BOOLEAN,
              allowNull: true,
              default: false
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'O campo Senha é obrigatório.'
              },
              notEmpty: {
                msg: 'O campo Senha é obrigatório.'
              }
            }
          },
        }, { sequelize })
    }

    static associate(models) {
      this.hasMany(models.Upload, { as: 'upload' });
      this.belongsTo(models.Empresa, { as: 'empresa' });
      this.belongsTo(models.Empresa, { as: 'empresaCliente' });
    }
}

module.exports = User;