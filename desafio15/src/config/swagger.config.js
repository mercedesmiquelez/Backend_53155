import swaggerJSDoc from "swagger-jsdoc";
import __dirname from "../../dirname.js" 

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "Documentación de API E-commerce", //esto se va a ver en el front lo que queremos mostrars
            version: "1.0.1",
            description: "API E-commerce"
        },
    },
    apis:[`${__dirname}/src/docs/**/*.yaml`]
}

export const specs = swaggerJSDoc(swaggerOptions);