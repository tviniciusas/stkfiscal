'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.changeColumn('solicitacoes', 'dt_solicitado', {
        type: Sequelize.DATE,
        allowNull: true // note this
      }),
      await queryInterface.changeColumn('solicitacoes', 'dt_visualizado', {
        type: Sequelize.DATE,
        allowNull: true // note this
      }),
      await queryInterface.changeColumn('solicitacoes', 'dt_finalizado', {
        type: Sequelize.DATE,
        allowNull: true // note this
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
