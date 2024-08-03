import { request, response } from "express";
import passport from "passport";

export const passportCall = (strategy) => {
  //con las estrategias manejamos los mensajes de error que podemos llegar a tener
  //recibe la estrategia que vamos a usar
  return async (req = request, res = response, next) => {
    //esta funcion retorna otra funcion
    passport.authenticate(strategy, { session: false }, (error, user, info) => {
      //estos 3 parametros vienen de la configuracion de passport equivalen a: error=null, user=false, info=message
      if (error) return next(error); //si viene un error, pasamos el error
      if (!user)
        return res.status(401).json({
          status: "error",
          msg: info.message ? info.message : info.toString(), //si viene algo que no sea el mensaje, la rta que me la transforme en un string para ver que es lo que muestra
        });

      req.user = user; //si no se cumplen estas condiciones anteriores, vamos a setear el usuario

      next(); //si no se frena en este middleware, que continue
    })(req, res, next);
  };
};

//Creamos el middleware de autorizacion para corroborar si el usuario es USER o ADMIN
export const authorization = (role) => {
  return async (req = request, res = response, next) => {
    if (!req.user)
      //chequeamos si existe el usuario:
      return res.status(401).json({ status: "error", msg: "No autorizado" });
    if (req.user.role !== role)
      //chequeamos si el rol es diferente al que recibimos:
      return res
        .status(403)
        .json({ status: "error", msg: "No tienes permiso" });

    next(); //si no ocurre ninguno de los errores anteriores, le damos next
  };
};
