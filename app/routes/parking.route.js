module.exports = app => {
    const parkingMiddleware = require("../middleware/middlewareParking");
    const errorHandler = require("../middleware/errorhandler");
    var router = require("express").Router();
    router.post("/", errorHandler.errorsParking, parkingMiddleware.errorCreate);
    router.post("/zone", errorHandler.errorsParking, parkingMiddleware.errorParkingZone);
    app.use('/api/park', router);
}