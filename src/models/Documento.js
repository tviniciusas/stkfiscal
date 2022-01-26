const { Model, DataTypes } = require('sequelize');

class Documento extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notNull: {
                    msg: 'O campo Nome é obrigatório.'
                  },
                  notEmpty: {
                    msg: 'O campo Nome é obrigatório.'
                  },
                  max: 150
                }
              },
            extensao: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  notNull: {
                    msg: 'O campo Extensão é obrigatório.'
                  },
                  notEmpty: {
                    msg: 'O campo Extensão é obrigatório.'
                  },
                  min: 3,
                  max: 5
                }
              },
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
        }, { sequelize })
    }

     static associate(models) {
       this.hasMany(models.SolicitacaoDocumentos, { as: 'solicitacao' });
     }
}
module.exports = Documento;