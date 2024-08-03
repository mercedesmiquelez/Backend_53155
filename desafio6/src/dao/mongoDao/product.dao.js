//Es una capa que se encarga de la conexion con la base de datos de consultar y guardar la informacion actualizada
import { productModel } from "../models/product.model.js";

const getAll = async (query, options) => {
  const products = await productModel.paginate(query, options);
  return products;
};

const getById = async (id) => {
  const product = await productModel.findById(id);
  return product;
};

const create = async (data) => {
  const product = await productModel.create(data);
  return product;
};

const update = async (id, data) => {
  await productModel.findByIdAndUpdate(id, data);
  const product = await productModel.findById(id);
  return product;
};

const deleteOne = async (id) => {
  const product = await productModel.deleteOne({ _id: id });
  if (product.deletedCount === 0) return false; //De esta forma controlamos la rta que le damos
  return true;
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};
