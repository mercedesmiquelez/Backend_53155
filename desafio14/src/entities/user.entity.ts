import { Document } from "mongoose";

export class UserEntity extends Document { // la entidad es la base de lo que va a ser un modelo. Extends extiende de otra clase (toma las propiedades de la misma)
    public name!: string;
    public lastName!: string; //el signo ! lo pongo para indicarle a typescript que si voy a ocupar esta propiedad y que no me tire error
    public email!: string;
    public password!: string;
    public tasks!: [];
}