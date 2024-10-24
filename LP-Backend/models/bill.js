'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bill.init({
    customer_id: DataTypes.STRING,
    cart_id: DataTypes.STRING,
    total_amount: DataTypes.STRING,
    payment_status: DataTypes.STRING,
    delivery_address: DataTypes.STRING,
    delivery_charge: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bill',
  });
  return bill;
};