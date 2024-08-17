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
exports.UserRepository = void 0;
const user_model_1 = require("../models/user.model");
const crud_repository_1 = require("./crud.repository");
class UserRepository extends crud_repository_1.CrudRepository {
    constructor() {
        super(user_model_1.userModel);
    }
    addTaskUser(userId, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.userModel.findByIdAndUpdate({ _id: userId }, { $push: { tasks: { task: taskId } } }, { new: true });
        });
    }
}
exports.UserRepository = UserRepository;
