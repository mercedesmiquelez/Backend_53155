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
exports.TaskServices = void 0;
const task_repository_1 = require("../repositories/task.repository");
const user_repository_1 = require("../repositories/user.repository");
class TaskServices {
    constructor() {
        this.taskRepository = new task_repository_1.TaskRepository();
        this.userRepository = new user_repository_1.UserRepository();
    }
    createTask(task, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTask = yield this.taskRepository.create(task);
            return yield this.userRepository.addTaskUser(userId, newTask._id);
        });
    }
}
exports.TaskServices = TaskServices;
