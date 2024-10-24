'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING
      },
      summery: {
        type: Sequelize.STRING
      },
      category_id: {
        type: Sequelize.STRING
      },
      brand_id: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      processing_device_id: {
        type: Sequelize.STRING
      },
      ordinary_device_id: {
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
    await queryInterface.dropTable('products');
  }
};