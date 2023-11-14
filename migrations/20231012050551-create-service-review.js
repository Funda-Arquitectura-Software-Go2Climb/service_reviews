'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('service_reviews', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: false
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tourist_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      serviceId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('service_reviews');
  }
};
