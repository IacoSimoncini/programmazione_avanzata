/**
 * This middleware module handles any errors related to functions within the "parking.controller.js" module.
 */
const parkingController = require("../controllers/parking.controller.js");

/**
 * This function catch every exception when the function "create" in parkingController is launched.
 * 
 * @param {Request} req The req object represents the HTTP request.
 * @param {Response} res The res object represents the HTTP response.
 * @param {next} next indicating the next middleware function.
 */
exports.errorCreate = async (req, res, next) => {
    try {
        await parkingController.create(req, res);
    } catch (e) {
        console.log(e);
        next(e);
    }
};

/**
 * This function catch every exception when the function "parkingZone" in parkingController is launched.
 * 
 * @param {Request} req The req object represents the HTTP request.
 * @param {Response} res The res object represents the HTTP response.
 * @param {next} next indicating the next middleware function.
 */
exports.errorParkingZone = async (req, res, next) => {
    try {
        await parkingController.parkingZone(req, res);
    } catch (e) {
        next(e);
    }
};
