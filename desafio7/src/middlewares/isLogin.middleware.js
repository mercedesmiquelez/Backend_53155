import { request, response } from "express";

export const isLogin = async (req = request, res = response, next) => {
  //Importamos req y res de express

  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ status: "Error", msg: "Usuario no logueado" });
  }
};
