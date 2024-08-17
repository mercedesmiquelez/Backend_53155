"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userCollection = "users";
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tasks: {
        type: [{ task: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "tasks" } }],
        default: [],
    },
});
userSchema.pre("findOne", function () {
    this.populate("tasks.task");
});
userSchema.pre("find", function () {
    this.populate("tasks.task");
});
exports.userModel = mongoose_1.default.model(userCollection, userSchema);
