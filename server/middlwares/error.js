'use strict';
import StatusCode from 'http-status';
import Validation from 'express-validation';
import APIError from '../helpers/api-error';
import { env } from '../config';

const handler = (err, req, res) => {
    const response = {
        code: err.status,
        message: err.message || StatusCode[err.status],
        errors: err.errors,
        stack: err.stack,
    };

    if (env !== 'development') {
        delete response.stack;
    }

    res.status(err.status);
    res.json(response);
};
exports.handler = handler;

exports.converter = (err, req, res, next) => {
  let convertedError = err;

  if (err instanceof Validation.ValidationError) {
    convertedError = new APIError({
      message: 'Validation error',
      errors: err.errors,
      status: err.status,
      stack: err.stack,
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }

  return handler(convertedError, req, res);
};

exports.notFound = (req, res, next) => {
  const err = new APIError({
    message: 'Not found',
    status: StatusCode.NOT_FOUND,
  });
  return handler(err, req, res);
};
