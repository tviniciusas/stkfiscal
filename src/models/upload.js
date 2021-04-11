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
              mes: {
                type: DataTypes.INTEGER,
                allowNull: true
              },
              ano: {
                type: DataTypes.INTEGER,
                allowNull: true
              },
              arquivo: {
                type: DataTypes.BLOB('long') ,
                allowNull: true
              },
        }, { sequelize })
    }
}

module.exports = Upload;


