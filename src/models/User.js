const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            email: DataTypes.STRING,
            admin: DataTypes.BOOLEAN,
            password: DataTypes.STRING,
            empresas_id: DataTypes.INTEGER,
        }, { sequelize })
    }
}

module.exports = User;


