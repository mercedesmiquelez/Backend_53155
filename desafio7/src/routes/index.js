import { Router } from "express";
import productsRouters from "./products.routes.js";
import cartsRouters from "./carts.routes.js";
import sessionRouters from "./session.routes.js";
import { isLogin } from "../middlewares/isLogin.middleware.js";
const router = Router();

//Indexamos las rutas de sesiones a nuestra api
router.use("/products", isLogin, productsRouters); //Chequeamos asi que el usuario este logueado: todos los endpoints pasan por este middleware
router.use("/carts", cartsRouters);
router.use("/session", sessionRouters);

export default router;
