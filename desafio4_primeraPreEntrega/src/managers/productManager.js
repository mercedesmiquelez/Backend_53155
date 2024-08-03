// Importamos FileSystem
import fs from "fs";

// Creamos un array vacío que va a contener los productos que ingrese el usuario
let products = [];
// Declaramos una variable que contiene la ruta en donde se van a almacenar todos los productos
let pathFile = "./src/data/products.json";


// Creamos un nuevo producto de forma asincrona
const addProduct = async (product) => {
    const { title, description, price, thumbnail, code, stock } = product;
    await getProducts();
    const newProduct = {
      id: products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status: true //modificamos el status que por defecto se crea en true
    };

    if (Object.values(newProduct).includes(undefined)) {
        console.log("Todos los campos son obligatorios");
        return;
      }    

    // Si el codigo se repite, no se va a agregar el producto y nos mostrara un mensaje para dar aviso
	const productExists = products.find((product) => product.code === code);
	if (productExists) {
		console.log(`El producto ${title} con el código ${code} ya existe`);
		return;
	}

    // Pusheamos el nuevo producto que se creo dentro del array de productos en el archivo json
	products.push(newProduct);

    // Dejamos el pathFile en una variable para que cualquier cambio sea mas facil de modificar y se utiliza el JSON.stringify para pasarlos a string que no quede como texto plano
    // Se pone el await porque es una promesa, es asincrona

    await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

// Hacemos una funcion asincrona que permite leer los productos que tenemos del archivo json
const getProducts = async (limit) => {
	const productsJson = await fs.promises.readFile(pathFile, "utf8") // Se declara el array "productsJson" que me trae todos los productos
    products = JSON.parse(productsJson) || []; // Tomamos el array "products", le reasignamos el valor y convertido con el "JSON.parse" y en el caso de que no existiese "productJson" se asigna un array vacío
    
    if(!limit) return products;

    return products.slice(0, limit);
};

// Función asincrona que permite buscar dentro del array un producto a través del Id ingresado por parámetro
const getProductById = async (id) => {
    //Para realizar la busqueda primero se obtienen los productos
    await getProducts();
    // Se comprueba si el id existe dentro del array
    const product = products.find((product) => product.id === id);
    // Si no encuentra el id quiere decir que no existe el elemento y da aviso por consola
    if (!product) {
        console.log(`No se encontró el producto con el id ${id}`);
        return;
    }

    // Si lo encuentra, muestra por consola el producto correspondiente
    console.log(product);
    return product;
};

// Actualizacion del producto
const updateProduct = async (id, dataProduct) => {
    await getProducts(id); // Llamamos a los productos para que se asignen de nuevo a nuestra variable

    const index = products.findIndex((product) => product.id === id); // Buscamos el valor indice que coincida con el producto ingresado
    products[index] = {
        ...products[index],
        ...dataProduct,
    } // Una vez obtenido el producto, hacemos una copia de las propiedades del producto: si existen se sobreescriben y si no existen, se crean

    await fs.promises.writeFile(pathFile, JSON.stringify(products)); // se sobreescribe el archivo con las nuevas modificaciones
}

// Eliminar un producto
const deleteProduct = async (id) => {
    await getProducts();
    products = products.filter((product) => product.id !== id); // Devuelve el array con todos los productos, menos el del id que recibe por parametro
    await fs.promises.writeFile(pathFile, JSON.stringify(products)); // se sobreescribe el archivo con el array modificado
};

export default {
    addProduct,
    getProductById,
    getProducts,
    updateProduct,
    deleteProduct,
}
