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
exports.UserServices = void 0;
const errorHandle_1 = require("../error/errorHandle");
const user_repository_1 = require("../repositories/user.repository");
class UserServices {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    registeUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getOne({ email: userData.email });
            if (user)
                throw errorHandle_1.ErrorHandle.badRequest("User already exists");
            return yield this.userRepository.create(userData);
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getOne({ email });
            if (!user || user.password !== password)
                throw errorHandle_1.ErrorHandle.unauthorized("Invalid email or password");
            return user;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getOne({ email });
            if (!user)
                throw errorHandle_1.ErrorHandle.notFound("User not found");
            return user;
        });
    }
}
exports.UserServices = UserServices;
