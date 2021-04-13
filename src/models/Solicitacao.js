const { Model, DataTypes } = require('sequelize');

class Solicitacao extends Model {
    static init(sequelize) {
        super.init({
            empresa: {
                type: DataTypes.STRING,
                allowNull: false
              },
            descricao: {
                type: DataTypes.STRING,
                allowNull: false
              },
            documento: {
                type: DataTypes.STRING,
                allowNull: false
              },
        }, { sequelize })
    }
}
module.exports = Solicitacao;


