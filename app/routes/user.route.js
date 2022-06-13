/**
 * Users routes
 */
module.exports = app => {
    const userMiddleware = require("../middleware/middlewareUser");
    const auth = require("../middleware/auth");
    var router = require("express").Router();
    router.post("/", auth.verifyToken, auth.checkHeader, auth.checkUser, userMiddleware.errorCreate);
    router.get("/credit", auth.verifyToken, auth.checkHeader, userMiddleware.errorCredit);
    router.post("/updatecredit", auth.verifyToken, auth.checkHeader, auth.checkUser, userMiddleware.errorUpdateCredit)
    app.use('/api/user', router);
}