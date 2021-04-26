'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('solicitacoes_documentos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      solicitacoes_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "solicitacoes",
          key: "id"
        }
      },
      documentos_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "documentos",
          key: "id"
        }
      },
      ano: {
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
    return queryInterface.dropTable('solicitacoes_documentos');
  }
};
