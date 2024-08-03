import mongoose from "mongoose";

const cartCollection = "carts"; // creamos colección de carritos

const cartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quantity: Number,
      },
    ],
  },
});

cartsSchema.pre("find", function () {
  // creamos el middleware para que cuando se utilice el find se haga el populate y nos muestre los productos que tiene el carrito
  this.populate("products.product");
});

export const cartModel = mongoose.model(cartCollection, cartsSchema);
