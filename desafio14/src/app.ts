import express, { NextFunction, Request, Response } from "express";
import envsConfig from "./config/envs.config";
import { MongoConfig } from "./config/mongoDb.config";
import { AppRouter } from "./routes/index.routes";
import cookieParser from "cookie-parser";

class AppServer {
  private app = express(); //decimos que la propiedad app al ser privada solo se va a utilizar dentro de esta clase
  private mongoConfig = new MongoConfig();
  constructor() {
    this.mongoConfig.connect(); //el this hace referencia a un elemento dentro de la clase
    this.middlewares();
    this.router(); //dp de que se ejecuten los middlewares se van a ejecutar las rutas
    this.listen(); 
  }

  middlewares() { //este metodo inicializa todos los middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  router() {
    this.app.use("/api", AppRouter.routes);

    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const status = err.status || 500;
      const message = status === 500 ? "Interna Server Error" : err.message;
      if(status === 500) {
        console.log(`Path: ${err.path}, message: ${err.message}`);
      }
      
      res.status(status).json({status, message});
    })
  }

  listen() { //metodo listen
    this.app.listen(envsConfig.PORT, () => {
      console.log(`Server on port ${envsConfig.PORT}`);
    });
  }
}

new AppServer();
