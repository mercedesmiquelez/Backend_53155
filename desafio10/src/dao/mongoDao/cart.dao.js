import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

const getById = async (id) => {
  const cart = await cartModel.findById(id);
  return cart;
};

const create = async (data) => {
  const cart = await cartModel.create(data);
  return cart;
};

// const update = async (query, data) => {
//   return await cartModel.findOneAndUpdate(query, data, { new: true });
// };

// //Para agregar un producto por pid a un carrito con cid
// const addProductToCart = async (cid, pid) => {
//   const product = await productModel.findById(pid);
//   if (!product) return { product: false }; // si no existe producto retornamos un false
//   const cart = await cartModel.findById(cid);
//   if (!cart) return { cart: false };

//   const productInCart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": 1 } });// con el cid podemos ubicar el carrito y en caso de encontrarlo incrementamos en 1 con "$inc" en la propiedad "quantity" el producto dentro del array products

//   if (!productInCart) { // en caso de que no exista el producto lo pushueamos con el método "$push" y establecemos el "quantity" en 1 para ingresar el producto por primera vez
//     await cartModel.updateOne({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } });
//   }

//   const cartUpdate = await cartModel.findById(cid).populate("products.product"); // usamos el findById para buscar el carrito modificado con el producto agregado y el método populate para ver el contenido completo del producto agregado
//   if(!cartUpdate) return { // validamos si existe cid de carrito
//     cart: false
// };

// return cartUpdate;
// }

// const deleteProductInCart = async (cid, pid) => {
//   const product = await productModel.findById(pid);
//   if (!product) return { product: false }; // si no existe producto retornamos un false

//     const cartUpdate = await cartModel.findOneAndUpdate({_id: cid, "products.product": pid}, {$inc: {"products.$.quantity": -1}}, {new: true}); // se busca en el carrito el producto "pid" en el array de productos del carrito "cid" y decrementa "quantity" en 1 y el método "new" en true devuelve el elemento actualizado; se declara "cartUpdated" como "let" para tener la posibilidad de modificar el contenido si algún producto llega a cantidad 0
//     if(!cartUpdate) return { // validamos si existe cid de carrito
//         cart: false
//     };

//      // Obtenemos el índice del producto en el array del carrito
//      const productIndex = cartUpdate.products.findIndex(p => p.product.toString() === pid);

//      // Verificamos si la cantidad del producto llegó a 0
//      if (cartUpdate.products[productIndex].quantity <= 0) {
//          // Eliminamos el producto del array del carrito
//          cartUpdate = await cartModel.findOneAndUpdate({ _id: cid }, { $pull: { products: { product: pid } } },{ new: true });
//      }

//      return cartUpdate;
//  };

// const updateQuantityProductInCart = async (cid, pid, quantity) => {
//   const product = await productModel.findById(pid);
//   if (!product) return { product: false }; // si no existe producto retornamos un false

//   const cart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $set: { "products.$.quantity": quantity } }, {new: true}); // se busca en el carrito el producto "pid" en el array de productos del carrito "cid" y se le establece la cantidad ingresada por el body, y el método "new" en true devuelve el elemento actualizado
//   if(!cartUpdate) return { // validamos si existe cid de carrito
//     cart: false
// };

// return cartUpdate;
// }

// const deleteAllProductsInCart = async (cid) => {
//   const cart = await cartModel.findByIdAndUpdate(cid, { $set: { products: [] } });

//   const cartUpdate = await cartModel.findById(cid);
//   return cartUpdate;
// };

export default {
  getById,
  create,
  //   addProductToCart,
  //   deleteProductInCart,
  //   update,
  //   updateQuantityProductInCart,
  //   deleteAllProductsInCart,
};
