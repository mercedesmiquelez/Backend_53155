import { UserEntity } from "../entities/user.entity";
import { userModel } from "../models/user.model";
import { CrudRepository } from "./crud.repository";

export class UserRepository extends CrudRepository<UserEntity> {
  constructor() {
    super(userModel); //heredo todos los metodos de user model al indicarle con super que lo tomo de ahi
  }

  async addTaskUser(userId: string, taskId: string) {
      return await userModel.findByIdAndUpdate({_id: userId}, {$push: {tasks: {task: taskId}}}, {new: true});
  }
}
