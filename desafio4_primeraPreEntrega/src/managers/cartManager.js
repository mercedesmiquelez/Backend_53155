import fs from "fs"; //Manejamos fileSystem

let carts = []; //Para obtener los carritos
const pathFile = "./src/data/carts.json" //Aca se crean los carritos

const getCarts = async () => {
  const cartsJson = await fs.promises.readFile(pathFile); 
  carts = JSON.parse(cartsJson) || []; // Va a leer el archivo y en caso que no haya nada, me va a devolver un array vacio

  return carts;
}

const createCart = async () => { //Creamos un carrito, es una funcion asincrona
  await getCarts(); //Trae todo lo que tiene dentro del archivo carts.json

  const newCart = {
    id: carts.length + 1, //Hacemos un id autoincremental
    products: [] //Cuando se cree un carrito, la propiedad products va a tener un array vacio de manera inicial
  };

  carts.push(newCart); 

  await fs.writeFile(pathFile, JSON.stringify(newCart)); //Se sobreescribe el archivo de carts.json en donde vamos a poner los carritos que se vayan creando

  return newCart;

}

//Creamos un metodo que busca un carrito por id y los productos
const getCartById = async (cid) => {
  await getCarts(); //traemos todos los productos
  
  const cart = carts.find(c => c.id === cid); //Busca el carrito id que sea igual al id del carrito que recibimos

  if(!cart) return `No se encuentra el carrito con el id ${cid}` //manejamos el error y enviamos un mensaje

  return cart.products; //sino enviamos el array de productos
}

const addProductToCart = async (cid, pid) => {
  await addProducts();
  // Buscar la posición índice del carrito
  const index = carts.findIndex(c => c.id === cid);
  // Verificar si el carrito existe
  if (index === -1) return `No se encontró el carrito con el id ${cid}`;

  // Verificar si el producto ya está en el carrito
  const productIndex = carts[index].products.findIndex(p => p.product === pid);

  // Si el producto ya está en el carrito, aumentar la cantidad
  if (productIndex !== -1) {
    carts[index].products[productIndex].quantity++;
  } else {
    // Si el producto no está en el carrito, agregarlo
    carts[index].products.push({
      product: pid,
      quantity: 1
    });
  }

  return carts[index]; // Devolver el carrito modificado
}

//Exportamos las funciones
export default {
  getCarts,
  createCart,
  getCartById,
  addProductToCart
}