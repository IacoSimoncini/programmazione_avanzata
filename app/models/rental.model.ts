'use strict';

import {
  Model, UUIDV4
} from 'sequelize';

interface RentalAttributes {
  id: string;
  email: string;
  payment: number;
  start: number;
  end: number;
  id_vehicle: number;
  type_vehicle: string;
}

module.exports = (sequelize: any, Sequelize: any) => {
  class Rental extends Model<RentalAttributes> 
  implements RentalAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    email!: string;
    payment!: number;
    start!: number;
    end!: number;
    id_vehicle!: number;
    type_vehicle!: string;
  };
  Rental.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    payment: {
      type: Sequelize.STRING,
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
  });
  return Rental;
};
