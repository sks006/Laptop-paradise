'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product.init({
    product_name: DataTypes.STRING,
    summery: DataTypes.STRING,
    category_id: DataTypes.STRING,
    brand_id: DataTypes.STRING,
    quantity: DataTypes.STRING,
    status: DataTypes.STRING,
    processing_device_id: DataTypes.STRING,
    ordinary_device_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};