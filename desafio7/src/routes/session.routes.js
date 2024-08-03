import e, { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";

const router = Router();

//Registrar usuario:
router.post("/register", async (req, res) => {
  //Post: para recibir informacion
  try {
    const userData = req.body; //Los datos del usuario de lo que vamos a recibir por el cuerpo del body
    const newUser = await userDao.create(userData); //Para registrar la data que recibimos
    if (!newUser)
      return res
        .status(400)
        .json({ status: "Error", msg: "No se pudo crear el usuario" });

    res.status(201).json({ status: "success", payload: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

//Para logear usuarios usamos el post para avisarle al servidor que le estamos enviando informacion para que trabaje con la misma.
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; //Recibimos un email y password

    // Verificar que el usuario sea administrador
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      req.session.user = {
        //Guardo la sesion del administrador
        email,
        role: "admin",
      };
      return res
        .status(200)
        .json({ status: "success", payload: req.session.user });
    }

    // En caso de que no sea administrador
    const user = await userDao.getByEmail(email);
    if (!user || user.password !== password) {
      //Debe coincidir password con el email, sino devolvemos un mensaje
      return res
        .status(401) //401 Indica que no esta autorizado para loguearse
        .json({ status: "Error", msg: "Email o password no válidos" });
    }

    req.session.user = {
      //Guardo la sesion del usuario
      email,
      role: "user",
    };

    res.status(200).json({ status: "success", payload: req.session.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

//Solicitamos el deslogueo: por eso usamos get
router.get("/logout", async (req, res) => {
  try {
    req.session.destroy();

    res
      .status(200)
      .json({ status: "success", msg: "Sesión cerrada con éxito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

export default router;
