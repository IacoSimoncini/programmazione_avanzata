const rentalController = require("../controllers/rental.controller.js");

exports.errorDone = async (req, res, next) => {
    try {
        await rentalController.done();
    } catch (e) {
        console.log(e);
        next(e);
    }
};

exports.errorStart = async (req, res, next) => {
    try {
        await rentalController.start();
    } catch (e) {
        next(e);
    }
};

exports.errorStop = async (req, res, next) => {
    try {
        await rentalController.stop();
    } catch (e) {
        next(e);
    }
};