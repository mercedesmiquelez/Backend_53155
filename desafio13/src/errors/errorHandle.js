import { logger } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = status === 500 ? "Internal Server Error" : err.message;

    if(status === 500) {
        logger.error(err.message) //Le paso el mismo mensaje que esta recibiendo el error interno
    }

    res.status(status).json( { error: {
            status,
            message,            
        },
    });
};