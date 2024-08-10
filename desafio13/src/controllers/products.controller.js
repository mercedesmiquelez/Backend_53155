import { generateProductsMock } from "../mocks/products.mock.js";
import productsServices from "../services/products.services.js";
import { logger } from "../utils/logger.js";

async function getProducts(req, res, next) {
	try {
		const { limit, page, sort, category, status } = req.query; 

		const optionsFilter = {
			limit: limit || 10,
			page: page || 1,
			sort: {
				price: sort === "asc" ? 1 : -1,
			},
			lean: true,
		};

		if (status) {
			const products = await productsServices.getProducts({ status }, optionsFilter);
			return res.status(200).json({ status: "success", products });
		}

		if (category) {
			const products = await productsServices.getProducts({ category }, optionsFilter);
			return res.status(200).json({ status: "success", products });
		}
        
        const products = await productsServices.getProducts({}, optionsFilter); 
		
        res.status(200).json({ status: "success", products });
		
	} catch (error) {
		next(error);
	}
};


async function getProductById(req, res, next) {
	try {
		const { pid } = req.params;

		const product = await productsServices.getProductById(pid);

		return res.json({ status: 200, response: product });
		
	} catch (error) {
		// logger.log("error", "[GET] /api/products/id:")
		next(error); 
	}
};

async function createAndGetProductsMock(req, res) { 
	const products = generateProductsMock(100);

	res.status(200).json({ status: "success", products });
	
};

async function createProduct(req, res, next) {
	try {
		const product = req.body;

		const newProduct = await productsServices.createProduct(product);

		return res.json({ status: 201, response: newProduct });
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

async function updateProductById(req, res, next) {
	try {
		const { pid } = req.params;
		const dataProduct = req.body; 

		const updateProduct = await productsServices.updateProductById(pid, dataProduct);

		return res.json({ status: 200, response: updateProduct });
	} catch (error) {
		logger.error(error);
		next(error); 
	}
};

async function deleteProductById(req, res, next) {
	try {
		const { pid } = req.params;

		const product = await productsServices.deleteProductById(pid); 
		return res.json({ status: 200, response: `El producto con ID ${pid} ha sido eliminado`}); 
		
	} catch (error) {
		logger.error(error);
		next(error); 
	}
};

export default {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
	createAndGetProductsMock,
}