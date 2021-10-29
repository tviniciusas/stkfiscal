const { Model, DataTypes } = require('sequelize');

class Solicitacao extends Model {
    static init(sequelize) {
        super.init({
            descricao: {
              type: DataTypes.STRING,
              allowNull: false
            },
            status: {
              type: DataTypes.STRING,
              allowNull: false
            },
            dt_solicitado: {
              type: DataTypes.DATE,
              allowNull: false
            },
            dt_visualizado: {
              type: DataTypes.DATE,
              allowNull: false
            },
            dt_finalizado: {
              type: DataTypes.DATE,
              allowNull: false
            }
        }, { sequelize })
    }

    static associate(models) {
      this.hasMany(models.SolicitacaoDocumento, { as: 'documento' });
      this.belongsTo(models.Empresa, { as: 'empresa' });
    }
}
module.exports = Solicitacao;


