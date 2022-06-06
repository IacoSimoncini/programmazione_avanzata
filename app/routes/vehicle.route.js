module.exports = app => {
    const vehicleController = require("../controllers/vehicle.controller.js");

    const auth = require("../middleware/auth");

    var router = require("express").Router();

    router.post("/", vehicleController.create);
    router.get("/filter/:type/", vehicleController.listAvailable);
    router.post("/sort", [auth.checkHeader], vehicleController.sortVehicles);
    app.use('/api/vehicle', router); 
}