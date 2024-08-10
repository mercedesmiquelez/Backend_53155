import { cartsModel } from "../models/carts.model.js";

const getCartById = async (id) => {
    const cart = await cartsModel.findById(id); 
    return cart;
};

const createCart = async (data) => {
    const cart = cartsModel.create(data); 
    return cart;
};
 

const addProductToCart = async (cid, pid) => {
    const productInCart = await cartsModel.findOneAndUpdate({_id: cid, "products.product": pid}, {$inc: {"products.$.quantity": 1}}, {new: true}) 
    if(!productInCart) { 
    return await cartsModel.findOneAndUpdate({ _id: cid}, { $push : { products: {product: pid, quantity: 1}}}, {new: true})
    }
    
    return productInCart;
};


const updateQuantityOfProduct = async (cid, pid, quantity) => {
    
    const cartUpdated = await cartsModel.findOneAndUpdate({_id: cid, "products.product": pid}, {$set: {"products.$.quantity": quantity}}, {new: true}); 

    return cartUpdated;
};


const deleteProductFromCart = async (cid, pid) => {
    
        
    let cartUpdated = await cartsModel.findOneAndUpdate({_id: cid, "products.product": pid}, {$inc: {"products.$.quantity": -1}}, {new: true}); 

    const productIndex = cartUpdated.products.findIndex(p => p.product.toString() === pid);


    if (cartUpdated.products[productIndex].quantity <= 0) {

        cartUpdated = await cartsModel.findOneAndUpdate({ _id: cid }, { $pull: { products: { product: pid } } },{ new: true });
    }

    return cartUpdated;
};



const clearCart = async (cid) => {
    const cartEmpty = await cartsModel.findOneAndUpdate({_id: cid}, {$set: {"products": []}}, {new: true});
    
    return cartEmpty;
};


const updateCart = async (cid, products) => {
    const cart = await cartsModel.findByIdAndUpdate(cid, {$set: {products}}, {new: true});

    return cart;
}

export default {
    getCartById,
    createCart,
    addProductToCart,
    deleteProductFromCart,
    updateQuantityOfProduct,
    clearCart,
    updateCart
}