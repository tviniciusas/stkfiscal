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
      mes: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      ano: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {model: 'users', key: 'id'}
      },
      empresa_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {model: 'empresas', key: 'id'}
      },
      solicitacao_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {model: 'solicitacoes', key: 'id'}
      },
      file_id: {
        type: Sequelize.STRING,
        allowNull: true,
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
    return queryInterface.dropTable('uploads');
  }
};