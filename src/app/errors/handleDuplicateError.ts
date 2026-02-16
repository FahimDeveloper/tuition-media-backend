/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import type { TErrorSources, TGenericErrorResponse } from '../types/error.types.js';

const handleDuplicateError = (err: any, file: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;
  if (file) {
    fs.unlinkSync(file);
  }
  return {
    statusCode,
    message: `${extractedMessage} is already exists`,
    errorSources,
  };
};

export default handleDuplicateError;
