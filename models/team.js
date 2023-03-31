const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Team extends Model {}

Team.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        team_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        team_location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        team_stadium: {
            type: DataTypes.INTEGER,
            references: {
                model: 'stadium',
                key: 'id',
            },
            allowNull: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        timestamps: false,
        modelName: 'team'
    }
);

module.exports = Team;