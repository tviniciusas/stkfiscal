const { Model, DataTypes } = require('sequelize');

class Empresa extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                allowNull: false
              },
              razao: {
                type: DataTypes.STRING,
                allowNull: false
              },
        
              ie: {
                type: DataTypes.STRING,
                allowNull: false
              },
              telefone: {
                type: DataTypes.STRING,
                allowNull: false
              },
              email: {
                type: DataTypes.STRING,
                allowNull: false
              },
              estado: {
                type: DataTypes.STRING,
                allowNull: false
              },
              cidade: {
                type: DataTypes.STRING,
                allowNull: false
              },
        }, { sequelize })
    }
}
module.exports = Empresa;
