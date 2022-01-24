const { Model, DataTypes } = require('sequelize');

class Historico extends Model {
    static init(sequelize) {
        super.init({
            data_hora: {
              type: DataTypes.DATE,
              allowNull: false
            },
            empresa: {
              type: DataTypes.STRING,
              allowNull: false
            },
            descricao: {
              type: DataTypes.STRING,
              allowNull: false
            },
            status: {
              type: DataTypes.STRING,
              allowNull: false
            },
        }, { sequelize })
    }

    static associate(models) {
      this.belongsTo(models.Solicitacoes, { as: 'solicitacao' });
    }
}
module.exports = Historico;