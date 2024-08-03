import { productResponseDto } from "../dto/product-response.dto.js";
import productsRepository from "../persistences/mongo/repositories/products.repository.js"
import error from "../errors/customErrors.js"; //importamos los custom errors

const getAll = async (query, options) => {
  const products = await productsRepository.getAll(query, options);
  return products;
}

const getById = async (id) => {
  const productData = await productsRepository.getById(id);
  if(!productData) throw error.notFoundError(`Product id ${id} not found`); //Hago la verificacion si no viene el product data, corto la ejecucion de mi aplicacion (al hacer el try catch en el controlador, el catch va a atajar el error)
  const product = productResponseDto(productData); //cuando traemos el product data, lo pasamos por este dto (productresponsedto)
  return product;
}

const create = async (data) => {
  const product = await productsRepository.create(data);
  return product;
}

const update = async (id, data) => {
  const product = await productsRepository.update(id, data);
  return product;
}

const deleteOne = async (id) => {
  const product = await productsRepository.deleteOne(id);
  return product;
}

export default {
  getAll,
  getById,
  update,
  deleteOne,
  create
}