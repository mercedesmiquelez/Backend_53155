//El controlador recibe todas las request que tenemos y da las respuestas al cliente:

import cartDao from "../dao/mongoDao/cart.dao.js";

// Para crear un carrito
const createCart = async (req, res) => {
  try {
    const cart = await cartDao.create();

    res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
};

// Para añadir un producto al carrito
const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartDao.addProductToCart(cid, pid);

    if (cart.product == false)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el producto con el id ${pid}`,
      }); // validación si existe el pid
    if (cart.cart == false)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el carrito con el id ${cid}`,
      }); // validación si existe el cid

    res.status(200).json({ status: "success", payload: cart }); // se muestra el carrito con el id correspondiente
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
};

// Para actualizar la cantidad de productos en el carrito
const updateQuantityProductInCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await cartDao.updateQuantityProductInCart(cid, pid, quantity);
    if (cart.product == false)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el producto con el id ${pid}`,
      }); // validación si existe el pid
    if (cart.cart == false)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el carrito con el id ${cid}`,
      }); // validación si existe el cid

    res.status(200).json({ status: "success", payload: cart }); // se muestra el carrito con el id correspondiente
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
};

// Para eliminar un producto del carrito
const deleteProductInCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartDao.deleteProductInCart(cid, pid);
    if (cart.product == false)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el producto con el id ${pid}`,
      }); // validación si existe el pid
    if (cart.cart == false)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el carrito con el id ${cid}`,
      }); // validación si existe el cid

    res.status(200).json({ status: "success", payload: cart }); // se muestra el carrito con el id correspondiente
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
};

// Solicitud de un carrito por el id
const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartDao.getById(cid);
    if (!cart)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el carrito con el id ${cid}`,
      }); // Si no corresponde el id a la ruta porque no existe , se envia un mensaje con la notificacion

    res.status(200).json({ status: "success", payload: cart }); // se muestra el carrito con el id correspondiente
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
};

const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await cartDao.update(cid, body);
    if (!cart)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el carrito con el id ${cid}`,
      });

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
};

// Para eliminar todos los productos del carrito
const deleteAllProductsInCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await cartDao.deleteAllProductsInCart(cid);
    if (!cart)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el carrito con el id ${cid}`,
      }); // Si no corresponde el id a la ruta porque no existe , se envia un mensaje con la notificacion

    res.status(200).json({ status: "success", payload: cart }); // se muestra el carrito con el id correspondiente
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Error", msg: "Error interno del servidor" });
  }
};

export default {
  createCart,
  addProductToCart,
  updateQuantityProductInCart,
  deleteProductInCart,
  getCartById,
  updateCart,
  deleteAllProductsInCart,
};
