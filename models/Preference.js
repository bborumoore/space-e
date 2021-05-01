const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Preference extends Model {}

Preference.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    launches: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    iss_view: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    celestial: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    plant_views: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'project',
  }
);

module.exports = Preference;