'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     return queryInterface.createTable('empresas', {
       id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
       },
       nome: {
         type: Sequelize.STRING,
         allowNull: false,
       },
       razao: {
         type: Sequelize.STRING,
         allowNull: false,
       },
       cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ie: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
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

    return queryInterface.dropTable('empresas');

  }
};
