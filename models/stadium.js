const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Stadium extends Model {}

Stadium.init({
  Stadium_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
