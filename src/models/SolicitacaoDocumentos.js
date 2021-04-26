const { Model, DataTypes } = require('sequelize');

class SolicitacaoDocumentos extends Model {
  static init(sequelize) {
    super.init({
      ano: {
        type: DataTypes.STRING,
        allowNull: true
      },
    },
      {
        sequelize,
        tableName: 'solicitacoes_documentos'
      })
  }

  static associate(models) {
    this.belongsTo(models.Solicitacao, { foreignKey: 'solicitacoes_id', as: 'solicitacao_documentos' })
    this.belongsTo(models.Documento, { foreignKey: 'documentos_id', as: 'documento' })
  }
}

module.exports = SolicitacaoDocumentos;


