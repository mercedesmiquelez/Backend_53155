import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

const getById = async (id) => {
  const cart = await cartModel.findById(id);
  return cart;
};

const create = async (data) => {
  const cart = await cartModel.create(data); // usamos este metodo para create para crear un carrito
  return cart;
};
// para agregar un producto por id a un carrito:
const addProductToCart = async (cid, pid) => {
  const product = await productModel.findById(pid); //primero se chequea si existe el producto
  if (!product)
    return {
      product: false,
    }; // hacemos la verificacion y si no existe producto retornamos un false

  const productInCart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $inc: { "products.$.quantity": 1 } }
  ); // accedemos al array de productos que tiene nuestro producto y accedemos al id que estamos buscando. Luego usamos el operador de productos, para modificar la cantidad: en este caso que incremente en 1
  if (!productInCart) {
    // en caso de que no exista el producto lo pushueamos y establecemos el "quantity" (como segunda propiedad) en 1 para ingresar el producto por primera vez
    await cartModel.findOneAndUpdate(
      { _id: cid },
      { $push: { products: { product: pid, quantity: 1 } } }
    );
  }

  const cartUpdated = await cartModel
    .findById(cid)
    .populate("products.product"); // usamos el metodo findById para buscar el carrito modificado con el producto agregado
  if (!cartUpdated)
    return {
      // validamos si existe cid de carrito
      cart: false,
    };
  return cartUpdated;
};

const deleteProductInCart = async (cid, pid) => {
  const product = await productModel.findById(pid);
  if (!product)
    return {
      product: false,
    }; // si no existe producto retornamos un false

  let cartUpdated = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid }, // buscamos en el array de productos el pid
    { $inc: { "products.$.quantity": -1 } }, // decrementamos la quantity en 1
    { new: true } // este metodo devuelve el elemento actualizado
  );
  if (!cartUpdated)
    return {
      cart: false,
    };

  const productIndex = cartUpdated.products.findIndex(
    (p) => p.product.toString() === pid
  );

  if (cartUpdated.products[productIndex].quantity <= 0) {
    // Eliminamos el producto del array del carrito
    cartUpdated = await cartModel.findOneAndUpdate(
      { _id: cid },
      { $pull: { products: { product: pid } } },
      { new: true }
    );
  }

  return cartUpdated;
};

const update = async (cid, pid, quantity) => {
  const product = await productModel.findById(pid);
  if (!product)
    return {
      product: false,
    }; // si no existe producto retornamos un false
  const cartUpdated = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $set: { "products.$.quantity": quantity } },
    { new: true }
  );

  if (!cartUpdated)
    return {
      // validamos si existe cid de carrito
      cart: false,
    };

  return cartUpdated;
};

const deleteAllProductsInCart = async (cid) => {
  const cartEmpty = await cartModel.findOneAndUpdate(
    { _id: cid },
    { $set: { products: [] } },
    { new: true }
  );

  return cartEmpty;
};

export default {
  getById,
  create,
  addProductToCart,
  deleteProductInCart,
  update,
  deleteAllProductsInCart,
};
