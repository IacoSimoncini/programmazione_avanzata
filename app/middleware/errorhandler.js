"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Handles errors of variable types in parking functions.
 *
 * @param {Request} req The req object represents the HTTP request.
 * @param {Response} res The res object represents the HTTP response.
 * @param {next} next indicating the next middleware function.
 */
exports.errorsParking = (req, res, next) => {
    const lat = req.body.lat;
    const long = req.body.long;
    if (typeof lat === "number" && typeof long === "number") {
        if (!lat) {
            if (!long) {
                return res.status(400).send({
                    message: "Invalid latitude and longitude."
                });
            }
            else {
                return res.status(400).send({
                    message: "Invalid latitude."
                });
            }
        }
        else {
            if (!long) {
                return res.status(400).send({
                    message: "Invalid longitude."
                });
            }
            else {
                return next();
            }
        }
    }
    else {
        return res.status(400).send({
            message: "Invalid type."
        });
    }
};
/**
 * Handles errors of variable types in vehicles functions.
 *
 * @param {Request} req The req object represents the HTTP request.
 * @param {Response} res The res object represents the HTTP response.
 * @param {next} next indicating the next middleware function.
 */
exports.errorsVehicles = (req, res, next) => {
    const id_vehicle = req.body.id_vehicle;
    const type = req.body.type;
    const lat = req.body.lat;
    const long = req.body.long;
    if (typeof lat === "number" && typeof long === "number" && typeof id_vehicle === "number" && typeof type === "string") {
        return next();
    }
    else {
        return res.status(400).send({
            message: "Invalid type."
        });
    }
};
