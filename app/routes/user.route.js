module.exports = app => {
    const userController = require("../controllers/user.controller.js");
    var router = require("express").Router();
    router.post("/", userController.create);
    app.use('/api/user', router);
}