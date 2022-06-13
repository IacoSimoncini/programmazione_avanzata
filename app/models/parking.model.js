'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/**
 * Definition of the "Parking" table in the database.
 */
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
        timestamps: false
    });
    return Parking;
};
