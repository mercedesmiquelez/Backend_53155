import mongoose from "mongoose";

const userCollection = "user";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  age: Number,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts"} //Hace la referencia al carts que nombramos en cart.model
  //nuestro modelo de usuario tiene el carrito asignado al id del carrito creado previamente
});


export const userModel = mongoose.model(userCollection, userSchema);