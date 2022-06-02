module.exports = app => {
    const vehicleController = require("../controllers/vehicle.controller.js");

    const auth = require("../middleware/auth");

    var router = require("express").Router();

    router.post("/", vehicleController.create);
    router.get("/:lat&:long&:type", vehicleController.listAvailable);
    app.use('/api/vehicle', router);
}