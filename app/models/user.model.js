module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      email: {
        type: Sequelize.STRING
      },
      credit: {
        type: Sequelize.FLOAT
      },
      lat: {
        type: Sequelize.FLOAT(8)
      },
      long: {
        type: Sequelize.FLOAT(8)
      }
    });
    return User;
  };