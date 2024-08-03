import express from "express";
import router from "./routes/index.js";
import { connectMongoDB } from "./config/mongoDb.config.js";
//Instalamos los siguientes 2 paquetes para conectar a la sesion con Mongo Atlas:
import session from "express-session";
import MongoStore from "connect-mongo";

connectMongoDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Configuramos la sesion:
app.use(
  session({
    store: MongoStore.create({
      //Hacemos esto para que Mongo sepa que va a crear una sesion
      mongoUrl:
        "mongodb+srv://admin:admin123456@e-commerce.vn9a3yh.mongodb.net/ecommerce",
      ttl: 15, //Tiempo de duracion de la sesion
    }),
    secret: "CodigoSecreto", //Configuramos el codigo secreto para que no se pueda acceder a la inforacion
    resave: true, //Para que dure la sesion
  })
);

app.use("/api", router);

app.listen(8080, () => {
  console.log("Escuchando el servidor en el puerto 8080");
});
