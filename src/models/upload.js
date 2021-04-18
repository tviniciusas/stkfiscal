const { Model, DataTypes } = require('sequelize');

class Upload extends Model {
    static init(sequelize) {
        super.init({
            diretorio: {
                type: DataTypes.STRING,
                allowNull: false
              },
              user: {
                type: DataTypes.STRING,
                allowNull: true
              },
              empresa: {
                type: DataTypes.STRING,
                allowNull: true
              },
              mes: {
                type: DataTypes.INTEGER,
                allowNull: false
              },
              ano: {
                type: DataTypes.INTEGER,
                allowNull: false
              },
     
        }, { sequelize })
    }
}

module.exports = Upload;


