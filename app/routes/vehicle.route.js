module.exports = app => {
    const vehicleController = require("../controllers/vehicle.controller.js");

    const auth = require("../middleware/auth");
    const errorsHandler = require("../middleware/errorhandler");

    var router = require("express").Router();

    router.post("/", vehicleController.create);
    router.get("/available/:type/", vehicleController.listAvailable);
    router.post("/filter", [auth.verifyToken, auth.checkHeader], vehicleController.filterVehicles);
    app.use('/api/vehicle', router); 
}