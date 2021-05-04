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
    spaceX: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    iss: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    snapi: {
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