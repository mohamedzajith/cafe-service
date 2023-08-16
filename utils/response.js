const successResponse = (res, data, message = null) => {
  const response = {
    status: true,
    result: data,
    message: message ? message : "OK",
  };
  res.status(200).send(response);
};

const badRequestResponse = (res, data, message = null) => {
  const response = {
    status: false,
    result: data,
    message: message ? message : "Bad Request",
  };
  res.status(400).send(response);
};

const unauthorizedResponse = (res, data, message = null) => {
  const response = {
    status: false,
    result: {
      error: data,
    },
    message: message ? message : "Unauthorized",
  };
  res.status(401).send(response);
};

const notFoundResponse = (res, data, message = null) => {
  const response = {
    status: false,
    result: {
      error: data,
    },
    message: message ? message : "Not found",
  };
  res.status(404).send(response);
};

const errorResponse = (res, data, message = null) => {
  const response = {
    status: false,
    result: {
      error: data.errors,
    },
    message: message ? message : data.message,
  };
  res.status(409).send(response);
};

const validationFailResponse = (res, data, message = null) => {
  const response = {
    status: true,
    result: {
      error: data.details,
    },
    message: message ? message : "Validation",
  };
  res.status(422).send(response);
};

const tokenNotProvideResponse = (res, data, message = null) => {
  const response = {
    status: false,
    result: {
      error: data,
    },
    message: message ? message : "No token provided!",
  };
  res.status(403).send(response);
};

const genericResponse = (res, code, data, message = null) => {
  const response = {
    status: true,
    result: {
      ...data,
    },
    message,
  };
  res.status(code).send(response);
};

const Response = {
  successResponse,
  unauthorizedResponse,
  validationFailResponse,
  notFoundResponse,
  errorResponse,
  tokenNotProvideResponse,
  badRequestResponse,
  genericResponse,
};
module.exports = Response;
