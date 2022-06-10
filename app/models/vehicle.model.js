'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    class Vehicle extends sequelize_1.Model {
    }
    ;
    Vehicle.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        id_vehicle: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lat: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        long: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        nol: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Vehicle',
        timestamps: false
    });
    return Vehicle;
};
