module.exports = app => {
    const userController = require("../controllers/user.controller.js");
    const auth = require("../middleware/auth");
    var router = require("express").Router();
    router.post("/", [auth.verifyToken, auth.checkHeader], userController.create);
    router.get("/credit", [auth.verifyToken, auth.checkHeader], userController.credit);
    router.post("/updatecredit", [auth.verifyToken, auth.checkHeader, auth.checkUser], userController.updateCredit)
    app.use('/api/user', router);
}