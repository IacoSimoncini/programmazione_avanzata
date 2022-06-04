module.exports = app => {
    const vehicleController = require("../controllers/vehicle.controller.js");

    const auth = require("../middleware/auth");

    var router = require("express").Router();

    router.post("/", vehicleController.create);
    router.get("/filter/:type/", vehicleController.listAvailable);
    router.get("/sort/:lat/:long", vehicleController.sortVehicles);
    app.use('/api/vehicle', router); 
}