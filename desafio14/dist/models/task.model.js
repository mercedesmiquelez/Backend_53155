"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const taskCollection = "tasks";
const taskSchema = new mongoose_1.default.Schema({
    description: { type: String, required: true },
    done: { type: Boolean, default: false },
});
exports.taskModel = mongoose_1.default.model(taskCollection, taskSchema);
