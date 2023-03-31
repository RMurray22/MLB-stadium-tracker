const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_password: {  //do bcrypt stuff
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_favorite_team: {
            type: DataTypes.INTEGER,
            references: {
                model: 'team',
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
        modelName: 'user'
    }
);

module.exports = User;