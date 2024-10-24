'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class processing_device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  processing_device.init({
    ram: DataTypes.STRING,
    rom: DataTypes.STRING,
    processor: DataTypes.STRING,
    gpu: DataTypes.STRING,
    display: DataTypes.STRING,
    dimension: DataTypes.STRING,
    colors: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'processing_device',
  });
  return processing_device;
};