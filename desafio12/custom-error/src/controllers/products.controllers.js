import { generateProductsMocks } from "../mocks/products.mock.js";
// import { generateUsersMocks } from "../mocks/user.mock.js";
import productsServices from "../services/products.services.js";

const getAll = async (req, res, next) => {
  try {
    const { limit, page, sort, category, status } = req.query;
    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: {
        price: sort === "asc" ? 1 : -1,
      },
      lean: true,
    };

    if (status) {
      const products = await productsServices.getAll({ status: status }, options);
      return res.status(200).json({ status: "success", products });
    }

    if (category) {
      const products = await productsServices.getAll({ category: category }, options);
      return res.status(200).json({ status: "success", products });
    }

    const products = await productsServices.getAll({}, options);

    res.status(200).json({ status: "success", products });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await productsServices.getById(pid);

    res.status(200).json({ status: "success", payload: product });
  } catch (error) { //este catch ataja ese error que se genero (new error) y se lo paso al middleware (por el next(error))
    console.log(error);
    next(error); //middleware que recibe el error
  }
};

const create = async (req, res, next) => {
  try {
    const product = req.body;
    const newProduct = await productsServices.create(product);

    res.status(201).json({ status: "success", payload: newProduct });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const productData = req.body;

    const updateProduct = await productsServices.update(pid, productData);

    res.status(200).json({ status: "success", payload: updateProduct });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await productsServices.deleteOne(pid);

    res.status(200).json({ status: "success", payload: "Producto eliminado" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createProductsMocks = async (req, res) => {
    const products = generateProductsMocks(100)
    return res.status(200).json({ status: "ok", products });
};

// const createUsersMocks = async (req, res) => {
//   const products = generateUsersMocks(100)
//   return res.status(200).json({ status: "ok", users });
// }

export default {
  getAll,
  getById,
  update,
  deleteOne,
  create,
  createProductsMocks,
  // createUsersMocks
};