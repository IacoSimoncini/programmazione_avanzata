'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    class Parking extends sequelize_1.Model {
    }
    ;
    Parking.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        lat: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        long: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Parking',
    });
    return Parking;
};
