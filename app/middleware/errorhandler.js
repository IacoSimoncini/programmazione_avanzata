"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
