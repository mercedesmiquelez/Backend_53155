import { productsModel } from "../models/products.model.js"; 

const getProducts = async (query, options) => { 
    const products = await productsModel.paginate(query, options); 
    
    return products;
};

const getProductById = async (id) => {
	const product = productsModel.findById(id); 
    return product;
};

const createProduct = async (data) => {
	const product = productsModel.create(data); 
    return product;
};

const updateProductById = async (id, data) => {
	
    const product = await productsModel.findByIdAndUpdate(id, data, {new: true}); 
    return product;
};


const deleteProductById = async (id) => {
	const product = await productsModel.deleteOne({_id: id}); 
    if(product.deletedCount === 0) return false; 
    return true; 
};

export default {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
}