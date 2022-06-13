/**
 * This middleware module handles any errors related to functions within the "rental.controller.js" module.
 */
const rentalController = require("../controllers/rental.controller.js");

/**
 * This function catch every exception when the function "done" in "rentalController" is launched.
 * 
 * @param {Request} req The req object represents the HTTP request.
 * @param {Response} res The res object represents the HTTP response.
 * @param {next} next indicating the next middleware function.
 */
exports.errorDone = async (req, res, next) => {
    try {
        await rentalController.done(req, res);
    } catch (e) {
        console.log(e);
        next(e);
    }
};

/**
 * This function catch every exception when the function "start" in "rentalController" is launched.
 * 
 * @param {Request} req The req object represents the HTTP request.
 * @param {Response} res The res object represents the HTTP response.
 * @param {next} next indicating the next middleware function.
 */
exports.errorStart = async (req, res, next) => {
    try {
        await rentalController.start(req, res);
    } catch (e) {
        next(e);
    }
};

/**
 * This function catch every exception when the function "stop" in "rentalController" is launched.
 * 
 * @param {Request} req The req object represents the HTTP request.
 * @param {Response} res The res object represents the HTTP response.
 * @param {next} next indicating the next middleware function.
 */
exports.errorStop = async (req, res, next) => {
    try {
        await rentalController.stop(req, res);
    } catch (e) {
        next(e);
    }
};