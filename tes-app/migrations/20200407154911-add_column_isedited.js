'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Siswas',
      'isedited',
      Sequelize.BOOLEAN
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Siswas',
      'isedited'
    )
  }
};
