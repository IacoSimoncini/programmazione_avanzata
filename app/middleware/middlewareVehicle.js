const vehicleController = require("../controllers/vehicle.controller.js");

/**
 * This function catch every exception when the function "create" in "vehicleController" is launched.
 * 
 * @param {Request} req The req object represents the HTTP request.
 * @param {Response} res The res object represents the HTTP response.
 * @param {next} next indicating the next middleware function.
 */
exports.errorCreate = async (req, res, next) => {
    try {
        await vehicleController.create(req, res);
    } catch (e) {
        console.log(e);
        next(e);
    }
};

/**
 * This function catch every exception when the function "listAvailable" in "vehicleController" is launched.
 * 
 * @param {Request} req The req object represents the HTTP request.
 * @param {Response} res The res object represents the HTTP response.
 * @param {next} next indicating the next middleware function.
 */
exports.errorListAvailable = async (req, res, next) => {
    try {
        await vehicleController.listAvailable(req, res);
    } catch (e) {
        next(e);
    }
};

/**
 * This function catch every exception when the function "filterVehicles" in "vehicleController" is launched.
 * 
 * @param {Request} req The req object represents the HTTP request.
 * @param {Response} res The res object represents the HTTP response.
 * @param {next} next indicating the next middleware function.
 */
exports.errorFilterVehicles = async (req, res, next) => {
    try {
        await vehicleController.filterVehicles(req, res);
    } catch (e) {
        next(e);
    }
};
