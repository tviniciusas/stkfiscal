const { Model, DataTypes } = require('sequelize');

class Empresa extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                allowNull: true
              },
              razao: {
                type: DataTypes.STRING,
                allowNull: true
              },
              cnpj: {
                type: DataTypes.STRING,
                allowNull: true
              },
              ie: {
                type: DataTypes.STRING,
                allowNull: true
              },
              telefone: {
                type: DataTypes.STRING,
                allowNull: true
              },
              email: {
                type: DataTypes.STRING,
                allowNull: true
              },
              estado: {
                type: DataTypes.STRING,
                allowNull: true
              },
              cidade: {
                type: DataTypes.STRING,
                allowNull: true
              },
        }, { sequelize })
    }
}
module.exports = Empresa;
