const notFoundError = (message = "Not found") => {
    const error = new Error(message);
    error.status = 404;
    return error;
  };
  
  const badRequestError = (message = "Bad request") => {
    const error = new Error(message);
    error.status = 400;
    return error;
  };
  
  const unauthorizedError = (message = "Unauthorized") => {
    const error = new Error(message);
    error.status = 401;
    return error;
  };
  
  const forbiddenError = (message = "Forbidden") => {
    const error = new Error(message);
    error.status = 403;
    return error;
  };

  const conflictError = (message = "Conflict") => {
    const error = new Error(message);
    error.status = 409;
    return error;
};

const goneError = (message = "Gone") => {
    const error = new Error(message);
    error.status = 410;
    return error;
};

const unprocessableEntityError = (message = "Unprocessable Entity") => {
    const error = new Error(message);
    error.status = 422;
    return error;
};

const internalServerError = (message = "Internal Server Error") => {
    const error = new Error(message);
    error.status = 500;
    return error;
};

export default {
    notFoundError,
    badRequestError,
    unauthorizedError,
    forbiddenError,
    conflictError,
    goneError,
    unprocessableEntityError,
    internalServerError
  };