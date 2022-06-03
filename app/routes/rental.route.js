module.exports = app => {
    const rentalController = require("../controllers/rental.controller.js");
    const auth = require("../middleware/auth");
    var router = require("express").Router();
    router.post("/", [auth.checkHeader, auth.checkUser], rentalController.create);

    app.use('/api/rental', router);
}