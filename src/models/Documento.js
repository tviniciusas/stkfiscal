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
}
module.exports = Documento;


