import { UserEntity } from "../entities/user.entity";
import { ErrorHandle } from "../error/errorHandle";
import { UserRepository } from "../repositories/user.repository";

export class UserServices {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository(); //istanciamos la clase para que se inicialice
  }

  async registeUser(userData: UserEntity) { //recibimos la data (userEntity)
    const user = await this.userRepository.getOne({ email: userData.email }); //verificamos que vamos a buscar un usuario
    if (user) throw ErrorHandle.badRequest("User already exists"); //si existe el usuario
    return await this.userRepository.create(userData);
  }

  async loginUser(email: string, password: string) { //recibe un email y un password
    const user = await this.userRepository.getOne({ email });
    if (!user || user.password !== password) throw ErrorHandle.unauthorized("Invalid email or password");
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.getOne({ email });
    if(!user) throw ErrorHandle.notFound("User not found");
    return user;
  }
}
