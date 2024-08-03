import mongoose from "mongoose"; // Importamos el modulo de mongoose
import envs from "./env.config.js";

const urlDbMongo = envs.MONGO_URL; //Funcion para hacer la conexion con la base de datos

export const connectMongoDB = async () => {
  //Se usa el try catch para capturar el error en caso que se encuentre uno
  try {
    // Conexión con la base de datos
    mongoose.connect(envs.MONGO_URL);
    console.log("Mongo DB Conectado");
  } catch (error) {
    console.log(error);
  }
};
