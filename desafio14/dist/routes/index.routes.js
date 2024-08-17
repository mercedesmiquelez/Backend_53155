"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
const express_1 = require("express");
const user_routes_1 = require("./user.routes");
class AppRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use("/user", user_routes_1.UserRouter.routes);
        return router;
    }
}
exports.AppRouter = AppRouter;
