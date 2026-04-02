import { ZodError } from 'zod';
import type { TErrorSources, TGenericErrorResponse } from '../types/error.types';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const message: string[] = [];
  const errorSources: TErrorSources = err.issues.map((issue: any) => {
    message.push(issue.message);
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;
  // if (file) {
  //   fs.unlinkSync(file);
  // }
  return {
    statusCode,
    message: message[0] as string,
    errorSources,
  };
};

export default handleZodError;
