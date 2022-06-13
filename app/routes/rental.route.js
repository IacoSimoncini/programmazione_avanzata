module.exports = app => {
    const auth = require("../middleware/auth");
    const rentMiddleware = require("../middleware/middlewareRent");
    var router = require("express").Router();
    router.post("/start/:id", auth.verifyToken, auth.checkHeader, auth.checkCredit, rentMiddleware.errorStart);
    router.post("/stop", auth.verifyToken, auth.checkHeader, auth.checkCredit, rentMiddleware.errorStop);
    router.post("/done", auth.verifyToken, auth.checkHeader, auth.checkCredit, rentMiddleware.errorDone)
    app.use('/api/rental', router);
}