'use strict';

import {
  Model, UUIDV4
} from 'sequelize';

interface VehicleAttributes {
  id: string;
  id_vehicle: number;
  type: string;
  lat: number;
  long: number;
  nol: boolean;
}

module.exports = (sequelize: any, Sequelize: any) => {
  class Vehicle extends Model<VehicleAttributes> 
  implements VehicleAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id!: string;
     id_vehicle!: number;
     type!: string;
     lat!: number;
     long!: number;
     nol!: boolean;
  };
  Vehicle.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: UUIDV4,
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
