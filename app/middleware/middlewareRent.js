const rentalController = require("../controllers/rental.controller.js");

exports.errorDone = async (req, res, next) => {
    try {
        await rentalController.done(req, res);
    } catch (e) {
        console.log(e);
        next(e);
    }
};

exports.errorStart = async (req, res, next) => {
    try {
        await rentalController.start(req, res);
    } catch (e) {
        next(e);
    }
};

exports.errorStop = async (req, res, next) => {
    try {
        await rentalController.stop(req, res);
    } catch (e) {
        next(e);
    }
};