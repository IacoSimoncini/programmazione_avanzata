module.exports = app => {
    const rentalController = require("../controllers/rental.controller.js");
    const auth = require("../middleware/auth");
    var router = require("express").Router();
    router.post("/start/:id", [auth.verifyToken, auth.checkHeader, auth.checkCredit], rentalController.start);
    router.post("/stop", [auth.verifyToken, auth.checkHeader, auth.checkCredit], rentalController.stop);
    router.post("/done",[auth.verifyToken, auth.checkHeader], rentalController.done)
    app.use('/api/rental', router);
}