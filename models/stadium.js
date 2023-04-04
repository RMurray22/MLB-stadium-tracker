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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(2),
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DECIMAL(9,6),
            allowNull: false,
        },
        latitude: {
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
