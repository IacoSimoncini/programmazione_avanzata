'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    class User extends sequelize_1.Model {
    }
    ;
    User.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        credit: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        lat: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        long: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
