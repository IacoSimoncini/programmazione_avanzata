module.exports = app => {
    const rentalController = require("../controllers/rental.controller.js");
    const auth = require("../middleware/auth");
    const middlewareRent = require("../middleware/middlewareRent");
    var router = require("express").Router();
    router.post("/start/:id", [auth.verifyToken, auth.checkHeader, auth.checkCredit], middlewareRent.errorStart);
    router.post("/stop", auth.verifyToken, auth.checkHeader, auth.checkCredit, middlewareRent.errorStop);
    router.post("/done",[auth.verifyToken, auth.checkHeader, auth.checkCredit], middlewareRent.errorDone)
    app.use('/api/rental', router);
}