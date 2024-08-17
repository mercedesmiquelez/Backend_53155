"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_services_1 = require("../services/user.services");
const jwt_1 = require("../utils/jwt");
const task_services_1 = require("../services/task.services");
class UserController {
    constructor() {
        this.registerUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.registeUser(req.body);
                res.status(201).json({ status: "ok", user });
            }
            catch (error) {
                error.path = "[POST] /api/user/register";
                next(error);
            }
        });
        this.loginUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.userService.loginUser(email, password);
                const token = (0, jwt_1.createToken)({ email: user.email, _id: user._id });
                res.cookie("token", token, { httpOnly: true });
                res.status(200).json({ status: "ok", user });
            }
            catch (error) {
                next(error);
            }
        });
        this.createTask = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = (0, jwt_1.verifyToken)(req.cookies.token);
                if (!userData)
                    throw new Error();
                console.log(userData);
                const user = yield this.userService.getUserByEmail(userData.email);
                const task = yield this.taskService.createTask(req.body, user._id);
                res.status(200).json({ status: "ok", task });
            }
            catch (error) {
                next(error);
            }
        });
        this.userService = new user_services_1.UserServices();
        this.taskService = new task_services_1.TaskServices();
    }
}
exports.UserController = UserController;
