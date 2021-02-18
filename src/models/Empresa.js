const { Model, DataTypes } = require('sequelize');

class Empresa extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            razao: DataTypes.STRING,
            cnpj: DataTypes.STRING,
            ie: DataTypes.STRING,
            telefone: DataTypes.STRING,
            email: DataTypes.STRING,
            estado: DataTypes.STRING,
            cidade: DataTypes.STRING,
        }, { sequelize })
    }
}
module.exports = Empresa;
