module.exports = app => {
    const parkingController = require("../controllers/parking.controller.js");
    const errorHandler = require("../middleware/errorhandler");
    var router = require("express").Router();
    router.post("/", [errorHandler.errorsParking], parkingController.create);
    router.post("/zone", [errorHandler.errorsParking], parkingController.parkingZone);
    app.use('/api/park', router);
}