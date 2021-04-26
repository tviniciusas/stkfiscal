'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'solicitacoes',
        'empresas_id',
        {
          type: Sequelize.INTEGER,
          after: 'id',
          references: {
              model: "empresas",
              key: "id"
            }
        }
      ),
      queryInterface.addColumn(
        'solicitacoes',
        'status',
        {
          type: Sequelize.STRING,
          after: 'empresas_id'
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('solicitacoes', 'empresas_id')
  }
};
