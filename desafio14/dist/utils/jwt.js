"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envs_config_1 = __importDefault(require("../config/envs.config"));
// Crear el token
const createToken = (user) => {
    const { _id, email } = user;
    const token = jsonwebtoken_1.default.sign({ _id, email }, envs_config_1.default.JWT_SECRET, { expiresIn: "10m" });
    return token;
};
exports.createToken = createToken;
// Verificar el token
const verifyToken = (token) => {
    try {
        const decode = jsonwebtoken_1.default.verify(token, envs_config_1.default.JWT_SECRET);
        return decode;
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
