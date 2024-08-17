import { Document, Model } from "mongoose";

export class CrudRepository<T extends Document > { //typescript puede recibir en sus clases un generico y va a representar a la entidad que nosotros le pasemos
  constructor(private model: Model<T>) {
    this.model = model;
  }
  async getAll() {
    return await this.model.find();
  }
  async getOne(query: {}) {
    return await this.model.findOne(query);
  }
  async getById(id: string) {
    return this.model.findById(id);
  }
  async create(data: T) {
    return await this.model.create(data);
  }
  async update(id: string, data: {}) {
    return await this.model.findByIdAndUpdate(id, data, { new: true }); //new: true para que nos devuelva la data actualizada
  }
  async delete(id: string) {
    return await this.model.findByIdAndDelete(id);
  }
}
