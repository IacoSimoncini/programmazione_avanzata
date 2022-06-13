/**
 * Vehicle routes
 */
module.exports = app => {
    const vehicleMiddleware = require("../middleware/middlewareVehicle");

    const auth = require("../middleware/auth");
    const errorsHandler = require("../middleware/errorhandler");

    var router = require("express").Router();

    router.post("/", auth.verifyToken, auth.checkHeader, auth.checkUser, errorsHandler.errorsVehicles ,vehicleMiddleware.errorCreate);
    router.get("/available", vehicleMiddleware.errorListAvailable);
    router.post("/filter", auth.verifyToken, auth.checkHeader, auth.checkCredit, vehicleMiddleware.errorFilterVehicles);
    app.use('/api/vehicle', router); 
}