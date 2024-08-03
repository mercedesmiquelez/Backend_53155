import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
  code: { //el ticket tiene un codigo de tipo string y es unico
    type: String,
    required: true,
    unique: true,
  },
  purchase_datatime: { //se registra la hora exacta y se genera automaticamente 
    type: Date,
    default: Date.now(),
  },
  amount: { //En este valor estara el valor total de la compra
    type: Number,
    required: true,
  },
  purchaser: { //Es donde esta el correo del usuario asociado al carrito
    type: String,
    required: true,
  },
});

ticketSchema.pre("find", function () {
  this.populate("products.product");
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);