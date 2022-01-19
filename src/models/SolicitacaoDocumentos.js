const { Model, DataTypes } = require('sequelize');

class SolicitacaoDocumentos extends Model {
    static init(sequelize) {
        super.init({
            ano: {
                type: DataTypes.STRING,
                allowNull: false
            },
            solicitacao_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            documento_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        }, { sequelize })
    }

    static associate(models) {
        this.belongsTo(models.Solicitacoes, { as: 'solicitacao' });
        this.belongsTo(models.Documento, { as: 'documento' });

        //this.belongsToMany(models.Solicitacoes, { through: 'solicitacao_documentos', as: 'solicitacao' });
        //this.belongsToMany(models.Documento, { through: 'solicitacao_documentos', as: 'documento' });
    }
}

module.exports = SolicitacaoDocumentos;