'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    class Rental extends sequelize_1.Model {
    }
    ;
    Rental.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        payment: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        start: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        end: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        id_vehicle: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        type_vehicle: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Rental',
        timestamps: false
    });
    return Rental;
};
