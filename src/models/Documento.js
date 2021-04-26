const { Model, DataTypes } = require('sequelize');

class Documento extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                allowNull: false
              },
            extensao: {
                type: DataTypes.STRING,
                allowNull: false
              },
            descricao: {
                type: DataTypes.STRING,
                allowNull: false
              },
        }, { sequelize })
    }

    static associate(models) {
      this.hasOne(models.SolicitacaoDocumentos, { foreignKey: 'documentos_id', as: 'documento' })
    }
}
module.exports = Documento;


