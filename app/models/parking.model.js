module.exports = (sequelize, Sequelize) => {
    const Parking = sequelize.define("parking", {
      lat: {
        type: Sequelize.FLOAT(8)
      },
      long: {
        type: Sequelize.FLOAT(8)
      }
    });
    return Parking;
  };