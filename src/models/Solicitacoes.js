const { Model, DataTypes } = require('sequelize');

class Solicitacoes extends Model {
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
              allowNull: true
            },
            empresa_id: {
              type: DataTypes.INTEGER,
              allowNull: false
            },
            dt_atendido: {
              type: DataTypes.DATE,
              allowNull: true
            },
            dt_finalizado: {
              type: DataTypes.DATE,
              allowNull: true
            }
        }, { sequelize })
    }

    static associate(models) {
      this.hasMany(models.SolicitacaoDocumentos, { as: 'documento' });
      this.belongsTo(models.Empresa, { as: 'empresa' });
      this.hasMany(models.Historico, { as: 'historico' });
      this.hasMany(models.Upload, { as: 'upload' });
    }
}
module.exports = Solicitacoes;


