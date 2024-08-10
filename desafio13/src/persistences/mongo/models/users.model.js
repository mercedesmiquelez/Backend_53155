import mongoose from "mongoose";

const usersCollection = "user"; 

const usersSchema = new mongoose.Schema({
	
	firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true 
    },
    password: String,
    age: Number,
    role: { 
        type: String,
        enum: ["user", "admin"], 
        default: "user", 
    },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
});

export const usersModel = mongoose.model(usersCollection, usersSchema);
