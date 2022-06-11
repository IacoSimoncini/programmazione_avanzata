module.exports = app => {
    const vehicleController = require("../controllers/vehicle.controller.js");

    const auth = require("../middleware/auth");
    const errorsHandler = require("../middleware/errorhandler");

    var router = require("express").Router();

    router.post("/", [auth.verifyToken, auth.checkHeader, auth.checkUser, errorsHandler.errorsVehicles] ,vehicleController.create);
    router.get("/available/:type/", vehicleController.listAvailable);
    router.post("/filter", [auth.verifyToken, auth.checkHeader, auth.checkCredit], vehicleController.filterVehicles);
    app.use('/api/vehicle', router); 
}