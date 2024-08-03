//Este middleware va a proteger y verificar si el carrito es del usuario

import { request, response } from "express";

export const isUserCart = async (req = request, res = response, next) => {
    const { cid } = req.params;
    if(req.user.cart !== cid) return res.status(404).json({status: "error", msg: "El id del carrito no corresponde al usuario"});
    // Cuando se haga la extraccion de la cookie, la estrategia de jwt va a poder verificar el cart y hacer la validacion !==cid
    next();
}