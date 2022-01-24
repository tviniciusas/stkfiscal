'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('empresas', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      razao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cnpj: {
       type: Sequelize.STRING,
       allowNull: true,
      },
      ie: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      empresa_cliente: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          default: false
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
    await queryInterface.dropTable('empresas');
  }
};
