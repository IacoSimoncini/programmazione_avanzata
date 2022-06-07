module.exports = (sequelize, Sequelize) => {
    const Rental = sequelize.define("rental", {
      email: {
        type: Sequelize.STRING
      },
      payment: {
        type: Sequelize.FLOAT
      },
      start: {
        type: Sequelize.FLOAT(8)
      },
      end: {
        type: Sequelize.FLOAT(8)
      },
      id_vehicle: {
        type: Sequelize.INTEGER
      },
      type_vehicle: {
        type: Sequelize.STRING
      }
    });
    return Rental;
};