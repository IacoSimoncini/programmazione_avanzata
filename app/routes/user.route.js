module.exports = app => {
    const userController = require("../controllers/user.controller.js");
    const auth = require("../middleware/auth");
    var router = require("express").Router();
    router.post("/", [auth.checkHeader], userController.create);
    router.get("/credit", [auth.checkHeader], userController.credit);
    router.post("/updatecredit", [auth.checkHeader, auth.checkUser], userController.updateCredit)
    app.use('/api/user', router);
}