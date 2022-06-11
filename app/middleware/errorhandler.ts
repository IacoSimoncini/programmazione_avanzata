import * as express from 'express';

exports.errorsParking = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const lat: number = req.body.lat;
    const long: number = req.body.long;
    if (typeof lat === "number" && typeof long === "number") {
        if (!lat) {
            if (!long) {
                return res.status(400).send({
                    message: "Invalid latitude and longitude."
                });
            } else {
                return res.status(400).send({
                    message: "Invalid latitude."
                });
            }
        } else {
            if (!long) {
                return res.status(400).send({
                    message: "Invalid longitude."
                });
            } else {
                return next();
            }
        }
    } else {
        return res.status(400).send({
            message: "Invalid type."
        })
    }
};

exports.errorsVehicles = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const id_vehicle: number = req.body.id_vehicle;
    const type: string = req.body.type;
    const lat: number = req.body.lat;
    const long: number = req.body.long;
    if (typeof lat === "number" && typeof long === "number" && typeof id_vehicle === "number" && typeof type === "string") {
        next();
    } else {
        return res.status(400).send({
            message: "Invalid type."
        });
    }
};
