module.exports = app => {
    const rentalController = require("../controllers/rental.controller.js");
    const auth = require("../middleware/auth");
    var router = require("express").Router();
    router.post("/start/:id", [auth.checkHeader, auth.checkCredit], rentalController.start);
    router.post("/stop", [auth.checkHeader, auth.checkCredit], rentalController.stop);
    app.use('/api/rental', router);
}