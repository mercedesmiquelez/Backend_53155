"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConfig = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const envs_config_1 = __importDefault(require("./envs.config"));
class MongoConfig {
    connect() {
        try {
            if (!envs_config_1.default.MONGO_URL)
                throw new Error("Not url connect");
            mongoose_1.default.connect(envs_config_1.default.MONGO_URL);
            console.log("Connected to MongoDB");
        }
        catch (error) {
            console.log(`Error connecting to MongoDB: ${error}`);
        }
    }
}
exports.MongoConfig = MongoConfig;
