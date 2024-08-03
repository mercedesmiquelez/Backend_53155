import nodemailer from "nodemailer";
import envs from "../config/env.config.js";
import __dirname from "../../dirname.js";

export const sendMail = async (email, subject, message, template) => {
  const transporter = nodemailer.createTransport({ //configuramos un transporter (un trasporte que se ocupa de ejecutar nuestro servicio de gmail para poder hacer el envio de correos)
    service: "gmail", //usa servicio de gmail
    port: 587, //el puerto que va a utilizar
    auth: { //las credenciales que nosotros obtenemos
      user: "mercedesmiquelez@gmail.com",
      pass: envs.GMAIL_PASS, // Esta viene de las contr que tenemos guardadas en las variables de entorno
    },
  });

  await transporter.sendMail({
    from: "mercedesmiquelez@gmail.com", //creamos el objeto de configuracion para mandar el emial: el primero es from (de dde viene el email)
    to: email, //el correo electronico destinatario que nosotros indicamos en el email
    subject, //asunto que vamos a recibir por parametros
    text: message, //el mensaje que va a ir en el email que vamos a recibir por parametros
    html: template,
    attachments: [//es un array con los objetos que se adjuntan
      { 
        filename: "gatito.jpg", //nombre de la imagen
        path: __dirname + "/public/images/gatito.jpg", //path de la ruta publica
        cid: "gatito",
      },
    ],
  });
};