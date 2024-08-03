import passport from "passport";
import local from "passport-local";
import google from "passport-google-oauth20";
import jwt from "passport-jwt";
import envs from "./env.config.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import userDao from "../dao/mongoDao/user.dao.js";

const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtracto = (req) => {
  // Creamos esta fn para extraer el token de la cookie
  let token = null; // Inicializamos en null

  if (req && req.cookies) {
    // Verificamos si existen req y req.cookies
    token = req.cookies.token; // Le asignamos a token lo que obtenemos de la cookie
  }

  return token;
};

const initializePassport = () => {
  // Esta función inicializa las estrategias que configuremos
  // Para passport solo existen estas dos propiedades que puede recibir username y password
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      /* 
      "register" es el nombre de la estrategia que estamos creando.
      passReqToCallback: true, nos permite acceder a la request en la función de autenticación.
      usernameField: "email", nos permite definir el campo que usaremos como username de passport.
      done es una función que debemos llamar cuando terminamos de procesar la autenticación.
      Nota: passport recibe dos datos el username y el password, en caso de que no tengamos un campo username en nuestro formulario, podemos usar usernameField para definir el campo que usaremos como username.
      */
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email, age, role } = req.body;
          const user = await userDao.getByEmail(username);
          if (user)
            return done(null, false, { message: "El usuario ya existe" });

          //si no existe el usuario
          const newUser = {
            // creamos un objeto para controlar la información que recibimos
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            role,
          };

          const createUser = await userDao.create(newUser);
          return done(null, createUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userDao.getByEmail(username);
          if (!user || !isValidPassword(user, password))
            return done(null, false, { message: "email o password inválidos" });

          // Si están bien los datos del usuario
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: "",
        clientSecret: "",
        callbackURL: "http://localhost:8080/api/session/google",
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const { name, emails } = profile;

          const user = {
            first_name: name.givenName,
            last_name: name.familyName,
            email: emails[0].value,
          };

          const existUser = await userDao.getByEmail(emails[0].value);
          if (existUser) return cb(null, existUser);

          const newUser = await userDao.create(user);
          cb(null, newUser);
        } catch (error) {
          return cb(error);
        }
      }
    )
  );

  //Usamos los middleware de passport para configurar:
  passport.use(
    "jwt", //el primer parametro va el nombre de la estrategia
    new JWTStrategy( //instancia de nuestra estrategia
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtracto]), //Extrae la informacion que necesita de la request: utilizamos el cookieExtracto
        secretOrKey: "codigoSecreto", //tiene que coincidir con el codigo secreto que configuramos en utils -> jwt.js
      },
      async (jwt_payload, done) => {
        //funcion callback, que es asincrona
        try {
          return done(null, jwt_payload); //en el primer parametro null ya que no hay ningun error
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Serialización y deserialización de usuarios
  /* 
  La serialización y deserialización de usuarios es un proceso que nos permite almacenar y recuperar información del usuario en la sesión.
  La serialización es el proceso de convertir un objeto de usuario en un identificador único.
  La deserialización es el proceso de recuperar un objeto de usuario a partir de un identificador único.
  Los datos del user se almacenan en la sesión y se recuperan en cada petición.
  */

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userDao.getById(id);
    done(null, user);
  });
};

export default initializePassport;

// Google
/* 
https://www.passportjs.org/packages/passport-google-oauth20/
https://console.developers.google.com/
https://developers.google.com/identity/protocols/oauth2/scopes

*/
