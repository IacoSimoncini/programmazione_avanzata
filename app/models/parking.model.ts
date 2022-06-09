'use strict';

import {
  Model, UUIDV4
} from 'sequelize';

interface ParkingAttributes {
  id: string;
  lat: number;
  long: number;
}

module.exports = (sequelize: any, Sequelize: any) => {
  class Parking extends Model<ParkingAttributes> 
  implements ParkingAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id!: string;
     lat!: number;
     long!: number;
  };
  Parking.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: UUIDV4,
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
