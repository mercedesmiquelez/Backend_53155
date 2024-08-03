import jwt from "jsonwebtoken";
import envs from "../config/env.config.js"

export const createToken = (user) => { 
  const { _id, email, role, cart } = user; //Cuando hagamos el login, dentro de nuestro token vamos a tener toda esta info del usuario (id, email, role, cart)
  const token = jwt.sign({ _id, email, role, cart }, envs.CODE_SECRET, { expiresIn: "1m" });
  return token;
};

export const verifyToken = (token) => {
  try {
    const decode = jwt.verify(token, envs.CODE_SECRET);
    return decode;
  } catch (error) {
    return null;
  }
};