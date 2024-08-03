import passport from "passport";
import local from "passport-local";
import google from "passport-google-oauth20";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import userDao from "../dao/mongoDao/user.dao.js";

const LocalStrategy = local.Strategy; //Va a utilizar la estrategia de local
const GoogleStrategy = google.Strategy;

const initializePassport = () => {
  // Esta función inicializa las estrategias que configuremos
  // Para passport solo existen estas dos propiedades que puede recibir username y password
  passport.use(
    //Cada estrategia utiliza un middleware de password
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
          const { first_name, last_name, email, age } = req.body;
          const user = await userDao.getByEmail(username);
          if (user)
            return done(null, false, { message: "El usuario ya existe" });

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };

          const createUser = await userDao.create(newUser);
          return done(null, createUser);
        } catch (error) {
          return done(error); //si habia un problema, le vamos a pasar el error de la autenticacion en done
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
          console.log(profile);

          const user = {
            first_name: name.givenName,
            last_name: name.familyName,
            email: emails[0].value,
          };

          const existUser = await userDao.getByEmail(emails[0].value); //Chequeo si el usuario existe registrado
          if (existUser) return cb(null, existUser); //si existe: null porque no hay ningun error, y el usuario para acceder a su sesion

          const newUser = await userDao.create(user); //si no se cumple lo anterior, se crea un nuevo usuario
          cb(null, newUser);
        } catch (error) {
          return cb(error);
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
