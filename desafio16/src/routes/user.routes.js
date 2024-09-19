import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { upload } from "../utils/uploadFiles.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

router.post("/email/reset-password", userController.sendEmailResetPassword);
router.post("/reset-password", userController.resetPassword);
router.get("/premium/:uid", userController.changeUserRole);
router.post(
    "/:uid/documents", //creo el endpoint 
    passportCall("jwt"),
    authorization(["user", "premium"]), //autorizamos para los user y para los premium
    upload.fields([ //esto da la posibilidad de subir multiples archivos
        { name: "profile", maxCount: 1 }, //la cant maxima de profiles que podemos recibir en la subida de archivos
        { name: "imgProduct", maxCount: 1 }, 
        { name: "document", maxCount: 3 }, 
    ]),
    userController.addDocuments
);

export default router;
