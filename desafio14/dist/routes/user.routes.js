"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
class UserRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        const userController = new user_controller_1.UserController();
        router.post("/register", userController.registerUser);
        router.post("/login", userController.loginUser);
        router.post("/task", userController.createTask);
        return router;
    }
}
exports.UserRouter = UserRouter;
