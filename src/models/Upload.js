const { Model, DataTypes } = require('sequelize');

class Upload extends Model {
    static init(sequelize) {
        super.init({
            diretorio: {
              type: DataTypes.STRING,
              allowNull: true
            },
            mes: {
              type: DataTypes.INTEGER,
              allowNull: false,
              validate: {
                notNull: {
                  msg: 'O campo Mês é obrigatório.'
                },
                notEmpty: {
                  msg: 'O campo Mês é obrigatório.'
                }
              }
            },
            ano: {
              type: DataTypes.INTEGER,
              allowNull: false,
              validate: {
                notNull: {
                  msg: 'O campo Ano é obrigatório.'
                },
                notEmpty: {
                  msg: 'O campo Ano é obrigatório.'
                }
              }
            },
            file_id: {
              type: DataTypes.STRING,
              allowNull: true
            }
        }, { sequelize })
    }

    static associate(models) {
      this.belongsTo(models.Empresa, { as: 'empresa' });
      this.belongsTo(models.User, { as: 'user' });
      this.belongsTo(models.Solicitacoes, { as: 'solicitacao' });
    }
}

module.exports = Upload;