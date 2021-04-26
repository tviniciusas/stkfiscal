'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('solicitacoes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      dt_solicitado: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dt_visualizado: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dt_finalizado: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('solicitar');
  }
};
