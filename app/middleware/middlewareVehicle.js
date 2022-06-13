const vehicleController = require("../controllers/vehicle.controller.js");

exports.errorCreate = async (req, res, next) => {
    try {
        await vehicleController.create(req, res);
    } catch (e) {
        console.log(e);
        next(e);
    }
};

exports.errorListAvailable = async (req, res, next) => {
    try {
        await vehicleController.listAvailable(req, res);
    } catch (e) {
        next(e);
    }
};

exports.errorFilterVehicles = async (req, res, next) => {
    try {
        await vehicleController.filterVehicles(req, res);
    } catch (e) {
        next(e);
    }
};
