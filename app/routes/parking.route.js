/**
 * Parking routes
 */
module.exports = app => {
    const parkingMiddleware = require("../middleware/middlewareParking");
    const errorHandler = require("../middleware/errorhandler");
    const auth = require("../middleware/auth");
    var router = require("express").Router();
    router.post("/", auth.verifyToken, auth.checkHeader, auth.checkUser, errorHandler.errorsParking, parkingMiddleware.errorCreate);
    router.post("/zone", errorHandler.errorsParking, parkingMiddleware.errorParkingZone);
    app.use('/api/park', router);
}