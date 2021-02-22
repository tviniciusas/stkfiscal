const { Model, DataTypes } = require('sequelize');

class Upload extends Model {
    static init(sequelize) {
        super.init({
            diretorio: {
                type: DataTypes.STRING,
                allowNull: true
              },
              user: {
                type: DataTypes.STRING,
                allowNull: true
              },
              empresa: {
                type: DataTypes.STRING,
                allowNull: true
              },
 
        }, { sequelize })
    }
}

module.exports = Upload;


