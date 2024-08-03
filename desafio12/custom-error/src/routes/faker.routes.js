import { Router } from "express";
import productsControllers from "../controllers/products.controllers.js";
// import sessionControllers from "../controllers/session.controllers";

const router = Router();

router.get("/mockinproducts", productsControllers.createProductsMocks);

// router.get("/mockingusers", sessionControllers.createUsersMocks);

export default router;