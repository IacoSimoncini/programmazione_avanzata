const userController = require("../controllers/user.controller.js");

exports.errorCreate = async (req, res, next) => {
    try {
        await userController.create(req, res);
    } catch (e) {
        console.log(e);
        next(e);
    }
};

exports.errorCredit = async (req, res, next) => {
    try {
        await userController.credit(req, res);
    } catch (e) {
        next(e);
    }
};

exports.errorUpdateCredit = async (req, res, next) => {
    try {
        await userController.updateCredit(req, res);
    } catch (e) {
        next(e);
    }
};
