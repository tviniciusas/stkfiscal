'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('solicitacao_documentos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ano: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      solicitacao_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {model: 'solicitacoes', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      documento_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {model: 'documentos', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      solicitaco_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('solicitacao_documentos');
  }
};
