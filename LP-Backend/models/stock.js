'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Stock.init({
    product_id: DataTypes.STRING,
    quantity: DataTypes.STRING,
    buying_price: DataTypes.STRING,
    selling_price: DataTypes.STRING,
    supplier_id: DataTypes.STRING,
    voucher_image: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};