import cartDao from "../dao/mongoDao/cart.dao.js";
import productDao from "../dao/mongoDao/product.dao.js"; //Lo importamos para consultar la parte del carrito

const createCart = async () => {
  return await cartDao.create(); //Retorna solo la conexion que tenemos con nuestra capa de dao
};

const addProductToCart = async (cid, pid) => {
  // Verificamos si existen el producto y el carrito
  await checkProductAndCart(cid, pid);
  const productInCart = await cartDao.update(
    { _id: cid, "products.product": pid },
    { $inc: { "products.$.quantity": 1 } }
  ); //Nos conectamos con las capas de persistencia de dao y le pedimos que haga un update
  /* 
  $inc: Este es el operador de incremento. Se utiliza para incrementar el valor de un campo numérico en la cantidad especificada.
  "products.$.quantity": 
  products: es el nombre del array 
  $:  es el operador de posición. Representa el primer elemento del array que coincide con la condición especificada 
  en el filtro de la consulta. Básicamente, este operador selecciona el elemento correcto del array para la actualización.
  quantity: es el campo del objeto dentro del array products cuyo valor queremos incrementar.
  */

  if (!productInCart) {
    //Si no existe el producto en el carrito:
    return await cartDao.update(
      { _id: cid },
      { $push: { products: { product: pid, quantity: 1 } } }
    ); //Va a hacer un update y como primer parametro se pasa la query de lo que va a buscar { _id: cid } y en el segundo parametro pushea el dato
  }

  return productInCart; //Devolvemos la informacion actualizada
};

const updateQuantityProductInCart = async (cid, pid, quantity) => {
  await checkProductAndCart(cid, pid);
  return await cartDao.update(
    { _id: cid, "products.product": pid },
    { $set: { "products.$.quantity": quantity } }
  );
};

const deleteProductInCart = async (cid, pid) => {
  await checkProductAndCart(cid, pid); //buscamos si existen los carritos y el producto

  return await cartDao.update(
    { _id: cid, "products.product": pid },
    { $inc: { "products.$.quantity": -1 } }
  );
};

const getCartById = async (id) => {
  return await cartDao.getById(id);
};

const updateCart = async (query, data) => {
  return await cartDao.update(query, data);
};

const deleteAllProductsInCart = async (cid) => {
  return await cartDao.update({ _id: cid }, { $set: { product: [] } });
};

const checkProductAndCart = async (cid, pid) => {
  const product = await productDao.getById(pid);
  if (!product) return { product: false };
  const cart = await cartDao.getById(cid);
  if (!cart) return { cart: false };
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
