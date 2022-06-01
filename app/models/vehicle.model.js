module.exports = (sequelize, Sequelize) => {
    const Vehicle = sequelize.define("vehicle", {
      code: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.FLOAT(8)
      },
      long: {
        type: Sequelize.FLOAT(8)
      },
      nol: {
        type: Sequelize.BOOLEAN
      }
    });
    return Vehicle;
  };