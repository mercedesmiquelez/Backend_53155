import { createLogger, transports, format, addColors } from 'winston'; // Desestructuramos las herramientas de winston que vamos a utilizar

const { printf, combine, colorize, timestamp } = format; //Desestructuramos de format las funciones que indicamos

const customLevels = { //creamos un objeto que va a tener dos propiedades: levels y colors
    levels: { // Es un objeto con niveles
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: { //Es un objeto con los colores
        fatal: 'red',
        error: 'red',
        warn: 'yellow',
        info: 'blue',
        http: 'magenta',
        debug: 'white',
    }
};

// Agregar los colores personalizados a winston
addColors(customLevels.colors);

// Formateo para nuestros logs
const logFormat = printf(({ level, message, timestamp, stack }) => { //usamos la funcion printf que desestructuramos
    return `${timestamp} ${level}: ${stack || message}`; //cuando se impriman los logs se van a representar con este formato
});

// Formato de la consola
const consoleFormat = combine( //usamos el metodo combine que desestructuramos de format
    colorize(), //le indicamos que tenga colores
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), //formatea el timestamp para que se vea mas lindo
    logFormat
);

// Función de filtro personalizada para un nivel específico
const levelFilter = (level) => {
    return format((info) => {
        return info.level === level ? info : false;
    })();
};

export const logger = createLogger({
    levels: customLevels.levels, 
    format: combine(
        format.errors({ stack: true }), // Asegura que los errores tengan el stack trace
        
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
    ),
    transports: [
        new transports.Console({ level: "http", format: consoleFormat }),//Le permite al logger ejecutar en consola los logs que solicitamos
        new transports.File({ filename: "logs/app.log", level: "http" }),//le indica que este transporte guarde el archivo en esa ruta
        new transports.File({ filename: "logs/error.log", level: "error" }),//con Level le indicamos hasta que nivel se va a mostrar
        new transports.File({ filename: "logs/only-info.log", format: levelFilter("info")})
    ],
});
