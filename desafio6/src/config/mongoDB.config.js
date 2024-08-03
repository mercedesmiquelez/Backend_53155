import mongoose from "mongoose";

//creo conexion con la base de datos ecommerce:
const urlDb =
  "mongodb+srv://admin:mer123@cluster0.jz5swgl.mongodb.net/ecommerce";

export const connectMongoDB = async () => {
  try {
    //Conexion con la base de datos
    mongoose.connect(urlDb);
    console.log("Mongo DB conectado");
  } catch (error) {
    console.log(error);
  }
};
