import mongoose from 'mongoose';
import type { TErrorSources, TGenericErrorResponse } from '../types/error.types.js';

const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
  const message: string[] = [];
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      message.push(val?.message);
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  const statusCode = 400;
  return {
    statusCode,
    message: message[1] as string,
    errorSources,
  };
};

export default handleValidationError;
