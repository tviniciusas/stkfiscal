'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
      await queryInterface.createTable('upload', { 

        id:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        diretorio: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        user: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        empresa: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      });
  },
  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.dropTable('upload');
  
  }
};
