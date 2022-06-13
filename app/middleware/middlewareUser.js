/**
 * This middleware module handles any errors related to functions within the "user.controller.js" module.
 */
const userController = require("../controllers/user.controller.js");

/**
 * This function catch every exception when the function "create" in "userController" is launched.
 * 
 * @param {Request} req The req object represents the HTTP request.
 * @param {Response} res The res object represents the HTTP response.
 * @param {next} next indicating the next middleware function.
 */
exports.errorCreate = async (req, res, next) => {
    try {
        await userController.create(req, res);
    } catch (e) {
        console.log(e);
        next(e);
    }
};

/**
 * This function catch every exception when the function "credit" in "userController" is launched.
 * 
 * @param {Request} req The req object represents the HTTP request.
 * @param {Response} res The res object represents the HTTP response.
 * @param {next} next indicating the next middleware function.
 */
exports.errorCredit = async (req, res, next) => {
    try {
        await userController.credit(req, res);
    } catch (e) {
        next(e);
    }
};

/**
 * This function catch every exception when the function "updateCredit" in "userController" is launched.
 * 
 * @param {Request} req The req object represents the HTTP request.
 * @param {Response} res The res object represents the HTTP response.
 * @param {next} next indicating the next middleware function.
 */
exports.errorUpdateCredit = async (req, res, next) => {
    try {
        await userController.updateCredit(req, res);
    } catch (e) {
        next(e);
    }
};
