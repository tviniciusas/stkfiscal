'use strict';

const { sequelize } = require("../../models/User");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn(
      'users',
      'admin', {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      }),
      await queryInterface.addColumn(
        'users',
        'empresas_id', {
          type: Sequelize.INTEGER,
        }),
      await queryInterface.removeColumn('users', 'name'),
    ]
  },

  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeColumn('users', 'admin'),
      await queryInterface.removeColumn('users', 'empresas_id'),
      await queryInterface.addColumn(
        'users',
        'name', {
          type: Sequelize.STRING,
          allowNull: false,
        }),
    ];
  }
};
