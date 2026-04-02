import mongoose from 'mongoose';
import type { TErrorSources, TGenericErrorResponse } from '../types/error.types';

const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;
  // if (file) {
  //   fs.unlinkSync(file);
  // }

  return {
    statusCode,
    message: 'Invalid Id, Please enter a valid Id',
    errorSources,
  };
};

export default handleCastError;
