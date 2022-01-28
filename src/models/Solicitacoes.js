const { Model, DataTypes } = require('sequelize');

class Solicitacoes extends Model {
    static init(sequelize) {
        super.init({
            descricao: {
              type: DataTypes.STRING,
              allowNull: false,
              validate: {
                notNull: {
                  msg: 'O campo Descrição é obrigatório.'
                },
                notEmpty: {
                  msg: 'O campo Descrição é obrigatório.'
                },
                max: 400
              }
            },
            status: {
              type: DataTypes.STRING,
              allowNull: false
            },
            dt_solicitado: {
              type: DataTypes.DATE,
              allowNull: true
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


