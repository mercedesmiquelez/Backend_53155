import { Router } from "express";
import productsRouters from "./products.routes.js";
import cartsRouters from "./carts.routes.js";
const router = Router();

//Configuramos los dos endpoints:
router.use("/products", productsRouters); //aca se van a encontrar todas las rutas de products
router.use("/carts", cartsRouters); //aca se van a encontrar todas las rutas de los carritos

export default router;