"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const envs_config_1 = __importDefault(require("./config/envs.config"));
const mongoDb_config_1 = require("./config/mongoDb.config");
const index_routes_1 = require("./routes/index.routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
class AppServer {
    constructor() {
        this.app = (0, express_1.default)(); //decimos que la propiedad app al ser privada solo se va a utilizar dentro de esta clase
        this.mongoConfig = new mongoDb_config_1.MongoConfig();
        this.mongoConfig.connect(); //el this hace referencia a un elemento dentro de la clase
        this.middlewares();
        this.router();
        this.listen();
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
    }
    router() {
        this.app.use("/api", index_routes_1.AppRouter.routes);
        this.app.use((err, req, res, next) => {
            const status = err.status || 500;
            const message = status === 500 ? "Interna Server Error" : err.message;
            if (status === 500) {
                console.log(`Path: ${err.path}, message: ${err.message}`);
            }
            res.status(status).json({ status, message });
        });
    }
    listen() {
        this.app.listen(envs_config_1.default.PORT, () => {
            console.log(`Server on port ${envs_config_1.default.PORT}`);
        });
    }
}
new AppServer();
