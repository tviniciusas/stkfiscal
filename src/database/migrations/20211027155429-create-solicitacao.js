'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('solicitar', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dt_solicitado: {
        type: Sequelize.DATE,
        allowNull: false
      },
      dt_visualizado: {
        type: Sequelize.DATE,
        allowNull: false
      },
      dt_finalizado: {
        type: Sequelize.DATE,
        allowNull: false
      },
      empresa_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'empresas', key: 'id'}
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
    return queryInterface.dropTable('solicitar');
  }
};
