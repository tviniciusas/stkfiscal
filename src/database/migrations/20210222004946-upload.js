'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
      await queryInterface.createTable('uploads', { 
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
        mes: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        ano: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      });
  },
  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.dropTable('uploads');
  
  }
};
