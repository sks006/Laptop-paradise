'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('processing_devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ram: {
        type: Sequelize.STRING
      },
      rom: {
        type: Sequelize.STRING
      },
      processor: {
        type: Sequelize.STRING
      },
      gpu: {
        type: Sequelize.STRING
      },
      display: {
        type: Sequelize.STRING
      },
      dimension: {
        type: Sequelize.STRING
      },
      colors: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('processing_devices');
  }
};