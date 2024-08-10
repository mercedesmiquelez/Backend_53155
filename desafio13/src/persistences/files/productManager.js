import fs from "fs";

let products = [];

let pathFile = "./src/data/products.json";

const addProduct = async (product) => {
    const { title, description, price, thumbnail, code, category, stock } = product;
    await getProducts(); 

	const newProduct = {
		id: products.length + 1,
		title,
		description,
		price,
		thumbnail,
		code,
        category,
		stock,
        status: true
	};


	const productExists = products.find((product) => product.code === code);
	if (productExists) {
		console.log(
			`El producto ${title} con el código ${code} ya existe`
		);
        throw Error (`El producto ${title} con el código ${code} ya existe`);
		return;
	}

    if(Object.values(newProduct).includes(undefined)) {
        console.log("Todos los campos son obligatorios");
        throw Error ("Todos los campos son obligatorios")
        return;
    }

	products.push(newProduct);

    
    await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

const getProducts = async (limit) => { 
	const productsJson = await fs.promises.readFile(pathFile, "utf-8") 
    products = JSON.parse(productsJson) || []; 
    
    if (!limit) return products; 

    return products.slice(0, limit); 
};


const getProductById = async (pid) => {

    await getProducts();

    const product = products.find( product => product.id === pid);

    if (!product) {
        console.log(`No se encontró el producto con el id ${pid}`);
        return;
    }


    console.log(product);
    return product;
};


const updateProductById = async (pid, dataProduct) => {
    await getProducts();

    const index = products.findIndex((product) => product.id === pid); 
    
    
    products[index] = {
        ...products[index],
        ...dataProduct
    } 
    

    await fs.promises.writeFile(pathFile, JSON.stringify(products)); 
    console.log(products[index]); 
}


const deleteProductById = async (id) => {
    await getProducts();
    products = products.filter( product => product.id !== id); 
    await fs.promises.writeFile(pathFile, JSON.stringify(products)); 

}

export default {
    addProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById,
};