export const errorHandle = (err, req, res, next) => { 
    const status = err.status || 500; 
    const message = status === 500 ? "Internal Server Error" : err.message; // Si el status viene por 500, lo verifica aca y manda el mensaje, y sino se mostrara el error del servidor 
  
    res.status(status).json({
      error: {
        message,
        status,
      },
    });
  };