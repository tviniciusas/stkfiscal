const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
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
            admin: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notNull: {
                    msg: 'O campo Senha é obrigatório '
                  },
                  notEmpty: {
                    msg: 'O campo Senha é obrigatório '
                  }
                }
            },
            empresas_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
        }, { sequelize })
    }
}

module.exports = User;