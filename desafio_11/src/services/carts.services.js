import cartsRepository from "../persistences/mongo/repositories/carts.repository.js";
import productsRepository from "../persistences/mongo/repositories/products.repository.js";

const createCart = async () => {
  return await cartsRepository.create();
};

const addProductToCart = async (cid, pid) => {
  return await cartsRepository.addProductToCart(cid, pid);
};

const updateQuantityProductInCart = async (cid, pid, quantity) => {
  return await cartsRepository.updateQuantityProductInCart(cid, pid, quantity);
};

const deleteProductInCart = async (cid, pid) => {
  return await cartsRepository.deleteProductInCart(cid, pid);
};

const getCartById = async (id) => {
  return await cartsRepository.getById(id);
};

const deleteAllProductsInCart = async (cid) => {
  return await cartsRepository.deleteAllProductsInCart(cid);
};

const purchaseCart = async (cid) => {
  const cart = await cartsRepository.getById(cid);
  let total = 0;
  const products = [];

  for( const product of cart.products){ //Se hace un recorrido de todos los carritos: el 'for of' se usa aca porque trabaja bien con el asyncronismo
    const prod = await productsRepository.getById(product.product) //Cada product va a ser cada elemento del array que se encuentre dentro del carrito: la propiedad product es el id del producto que almacenamos
    if(prod.stock >= product.quantity) {  //hacemos la verificacion: si el stock de mi producto es mayor a la cantidad que yo tenia en mi carrito, sumo el total de mi carrito
      total += prod.price * product.quantity; //calcula el precio por la cantidad de productos que tiene mi carrito
    } else { //si no hay stock suficiente
      products.push(product) //tomamos el array de products y le pasamos el producto que no hay stock suficiente
    }

    // Modificar los productos del carrito
    await cartsRepository.updateCart(cid, products);
  }

  return total; //Cuando termina todo, nos devuelve el total
}

export default {
  createCart,
  addProductToCart,
  updateQuantityProductInCart,
  deleteProductInCart,
  getCartById,
  deleteAllProductsInCart,
  purchaseCart
};