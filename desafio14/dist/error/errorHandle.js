"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandle = void 0;
class ErrorHandle extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.status = status;
        this.message = message;
    }
    static badRequest(message = "Bad Request") {
        return new ErrorHandle(400, message);
    }
    static unauthorized(message = "Unauthorized") {
        return new ErrorHandle(401, message);
    }
    static notFound(message = "Not found") {
        return new ErrorHandle(404, message);
    }
}
exports.ErrorHandle = ErrorHandle;
