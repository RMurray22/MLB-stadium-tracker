const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Trip model
class Game extends Model {}

// create fields/columns for Trip model
Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    stadium: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stadium',
        key: 'id',
        unique: false
      }  
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        unique: false
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'game'
  }
);

module.exports = Game;
