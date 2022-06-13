'use strict';

import {
  Model, Sequelize, UUIDV4
} from 'sequelize';

interface UserAttributes {
  id: string;
  credit: number;
  email: string;
  lat: number;
  long: number;
  role: string;
}

/**
 * Definition of the "User" table in the database.
 */
module.exports = (sequelize: any, Sequelize: any) => {
  class User extends Model<UserAttributes> 
  implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id!: string;
     credit!: number;
     email!: string;
     lat!: number;
     long!: number;
     role!: string;
  };
  User.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: UUIDV4,
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
    timestamps: false
  });
  return User;
};
