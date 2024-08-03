import bcrypt from "bcrypt";

// Hasheo de contraseñan

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10)); //primer parametro necesita la contraseña que vamos a encriptar y en el segundo parametro se determina la cant de caracteres de la contraseña
};

// Validar la contraseña
//El siguiente metodo, desencripta la contraseña, verifica que es igual y devuelve un valor booleano si es true o false:
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password); //primer parametro recibe la contraseña y en el segundo parametro se pasa el usuario para que de ahi extraiga la contraseña
};
