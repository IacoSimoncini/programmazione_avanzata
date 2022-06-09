module.exports = app => {
    const vehicleController = require("../controllers/vehicle.controller.js");

    const auth = require("../middleware/auth");

    var router = require("express").Router();

    router.post("/", vehicleController.create);
    router.get("/available/:type/", vehicleController.listAvailable);
    router.post("/filter", [auth.checkHeader], vehicleController.filterVehicles);
    app.use('/api/vehicle', router); 
}