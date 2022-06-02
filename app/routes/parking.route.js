module.exports = app => {
    const parkingController = require("../controllers/parking.controller.js");
    var router = require("express").Router();
    router.post("/", parkingController.create);
    router.post("/zone", parkingController.parkingZone);
    app.use('/api/park', router);
}