const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Stadium extends Model {}

Stadium.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        stadium_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stadium_city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stadium_state: {
            type: DataTypes.STRING(2),
            allowNull: false,
        },
        stadium_lon: {
            type: DataTypes.DECIMAL(9,6),
            allowNull: false,
        },
        stadium_lat: {
            type: DataTypes.DECIMAL(9,6),
            allowNull: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        timestamps: false,
        modelName: 'stadium'
    }
);

module.exports = Stadium;
