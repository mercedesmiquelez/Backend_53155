import mongoose from "mongoose";

//Creamos un modelo de usuario como se va a registrar en la Base de Datos
const userCollection = "user";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  age: Number,
});

export const userModel = mongoose.model(userCollection, userSchema);
