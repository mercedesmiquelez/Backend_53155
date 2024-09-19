import multer from "multer";
import path from "path";
import fs from "fs";
import customErrors from "../errors/customErrors.js";

const ensureDirectoriesExist = () => { //hacemos esta funcion para que cree los directorios que nosotros creemos
    const directories = ["public/uploads/profiles", "public/uploads/products", "public/uploads/documents"];

    directories.forEach((dir) => {
        if (!fs.existsSync(dir)) { //verifica si existe el directorio
            fs.mkdirSync(dir, { recursive: true }); //en caso que no exista, crea un directorio con el path que le indicamos
        }
    });
};

ensureDirectoriesExist();

const storage = multer.diskStorage({
    destination: (req, file, cb) => { //hacemos validaciones para ver que nos esta llegando
        if(file.fieldname === "profile") { 
            cb(null, "./public/uploads/profiles") //los que tengan el nombre profile se van a dirigir a esta carpeta
        } else if (file.fieldname === "imgProduct") {
            cb(null, "./public/uploads/products") //los que tengan el nombre imgProduct se van a dirigir a esta carpeta
        } else if (file.fieldname === "document") {
            cb(null, "./public/uploads/documents") //los que tengan el nombre document se van a dirigir a esta carpeta
        } else {
            cb(customErrors.badRequestError("Invalid fieldname"), null); //importamos el custom error y atajamos el error si llega del front
        }
    },
    filename: (req, file, cb) => { //formateamos el nombre del archivo cuando lo guardamos
        const userId = req.user._id; //en el nombre del archivo le pongo el id del usuario para identificarlo
        const extension = path.extname(file.originalname); // Obtiene la extensión del archivo 
        const basename = path.basename(file.originalname, extension); // Obtiene el nombre del archivo sin la extensión
        cb(null, `${basename}-${userId}${extension}`)
    },
});

export const upload = multer({ storage });
