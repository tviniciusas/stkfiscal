const { Model, DataTypes } = require('sequelize');
const { count } = require('sequelize/lib/model');
const SolicitacaoDocumentos = require('./SolicitacaoDocumentos');

class Solicitacao extends Model {
  static init(sequelize) {
    super.init({
      descricao: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dt_solicitado: {
        type: DataTypes.DATE,
        allowNull: true
      },
      dt_visualizado: {
        type: DataTypes.DATE,
        allowNull: true
      },
      dt_finalizado: {
        type: DataTypes.DATE,
        allowNull: true
      },
    },
      {
        sequelize,
        tableName: 'Solicitacoes'
      })
  }

  static associate(models) {
    this.belongsTo(models.Empresa, { foreignKey: 'empresas_id', as: 'empresa' })
    this.hasMany(models.SolicitacaoDocumentos, { foreignKey: 'solicitacoes_id', as: 'solicitacao_documentos' })
  }
}
module.exports = Solicitacao;


