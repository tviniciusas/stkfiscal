const { Model, DataTypes } = require('sequelize');

class SolicitacaoDocumento extends Model {
    static init(sequelize) {
        super.init({
            ano: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, { sequelize })
    }

    static associate(models) {
        this.belongsTo(models.Solicitacao, { as: 'solicitacao' });
        this.belongsTo(models.Documento, { as: 'documento' });
    }
}

module.exports = SolicitacaoDocumento;