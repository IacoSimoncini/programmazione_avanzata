module.exports = (sequelize, Sequelize) => {
    const Rental = sequelize.define("rental", {
      email: {
        type: Sequelize.STRING
      },
      payment: {
        type: Sequelize.FLOAT
      },
      time: {
        type: Sequelize.FLOAT(8)
      }
    });
    return Rental;
};