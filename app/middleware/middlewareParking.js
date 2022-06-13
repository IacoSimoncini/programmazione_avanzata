const parkingController = require("../controllers/parking.controller.js");

exports.errorCreate = async (req, res, next) => {
    try {
        await parkingController.create(req, res);
    } catch (e) {
        console.log(e);
        next(e);
    }
};

exports.errorParkingZone = async (req, res, next) => {
    try {
        await parkingController.parkingZone(req, res);
    } catch (e) {
        next(e);
    }
};
