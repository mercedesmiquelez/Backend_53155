import mongoose from "mongoose";
import { UserEntity } from "../entities/user.entity";

const userCollection = "users";

const userSchema = new mongoose.Schema<UserEntity>({ //se le puede dar un tipado al schema con lo que indique dentro de <>
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tasks: {
    type: [{ task: { type: mongoose.Schema.Types.ObjectId, ref: "tasks" } }],
    default: [],
  },
});

userSchema.pre("findOne", function(){
  this.populate("tasks.task");
})
userSchema.pre("find", function(){
  this.populate("tasks.task");
})

export const userModel = mongoose.model<UserEntity>(userCollection, userSchema);
