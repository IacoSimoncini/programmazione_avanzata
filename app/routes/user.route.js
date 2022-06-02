module.exports = app => {
    const userController = require("../controllers/user.controller.js");
    const auth = require("../middleware/auth");
    var router = require("express").Router();
    router.post("/", userController.create);
    router.post("/credit", [auth.checkHeader, auth.verToken], userController.credit);
    app.use('/api/user', router);
}