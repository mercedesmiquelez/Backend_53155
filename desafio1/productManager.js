// Array vacio donde vamos sumando los productos
let products = [];

// Esta funcion  agrega productos al arreglo de productos inicial: recibe todos los datos/ las propiedades que necesitamos de los productos
const addProduct = (title, description, price, thumbnail, code, stock) => {
  const newProduct = {
// se crea un id autoincrementable
    id: products.length + 1,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  };

// Para validar que todos los campos exitentes sean obligatorios
  if (Object.values(newProduct).includes(undefined)) {
    console.log("Todos los campos son obligatorios");
    return;
  }

  // Validamos que no se repita el campo code y con el return logramos que no se ejecute
  const productExists = products.find((product) => product.code === code);
  if (productExists) {
    console.log(`El producto ${title} con el código ${code} ya existe`);
    return;
  }
// Agregamos el producto a nuestro array de productos
  products.push(newProduct);
};

// Funcion que devuelve el arreglo con todos los productos creados hasta ese momento
const getProducts = () => {
  console.log(products);
  return products;
};

// Funcion que busca en el arreglo el producto que coincida con el id y con el return salimos de la funcion 
// Si no coincide ningun id, muestra en consola que no se encontro ese producto
const getProductById = (id) => {
  const product = products.find( product => product.id === id);
  if(!product) {
    console.log(`No se encontró el producto con el id ${id}`);
    return;
  }

  console.log(product);
  return product;
};

// Test

// Agregamos los productos
addProduct("Producto 5", "el quinto producto", 899, "http://www.google.com", "ADF126");
addProduct("Producto 1", "el primer producto", 299, "http://www.google.com", "ADF123", 10);
addProduct("Producto 2", "el segundo producto", 899, "http://www.google.com", "ADF124", 10);
addProduct("Producto 3", "el tercer producto", 899, "http://www.google.com", "ADF124", 10);
addProduct("Producto 4", "el cuarto producto", 899, "http://www.google.com", "ADF125", 10);

// Para obtener nuestros productos
// getProducts();

// Para obtener un producto por id
getProductById(4);