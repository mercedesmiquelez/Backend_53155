import { Router } from "express";
import cartsController from "../controllers/carts.cotrollers.js";
import {
  authorization,
  passportCall,
} from "../middlewares/passport.middleware.js";
const router = Router();

// Creamos las peticiones
router.post(
  "/",
  passportCall("jwt"),
  authorization("admin"),
  cartsController.createCart
); //En el endpoint sabemos que se va a realizar esta determinada accion: se va a pasar por los middlewares (passportCall/authorization) y va a pasar por el controlador (cartsControllers)

router.post(
  "/:cid/product/:pid",
  passportCall("jwt"),
  authorization("user"),
  cartsController.addProductToCart
);

router.put(
  "/:cid/product/:pid",
  passportCall("jwt"),
  authorization("user"),
  cartsController.updateQuantityProductInCart
);

router.delete(
  "/:cid/product/:pid",
  passportCall("jwt"),
  authorization("user"),
  cartsController.deleteProductInCart
);

router.get(
  "/:cid",
  passportCall("jwt"),
  authorization("user"),
  cartsController.getCartById
);

router.put(
  "/:cid",
  passportCall("jwt"),
  authorization("user"),
  cartsController.updateCart
);

router.delete(
  "/:cid",
  passportCall("jwt"),
  authorization("user"),
  cartsController.deleteAllProductsInCart
);

export default router;
