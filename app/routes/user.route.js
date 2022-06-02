module.exports = app => {
    const userController = require("../controllers/user.controller.js");
    const auth = require("../middleware/auth");
    var router = require("express").Router();
    router.post("/", [auth.checkHeader, auth.verToken, auth.checkUser], userController.create);
    app.use('/api/user', router);
}