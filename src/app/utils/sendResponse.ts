import { type Response } from 'express';

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  result?: T | T[],
  total?: number,
) => {
  return res.status(statusCode).json({
    message: message,
    results: result,
    total: total,
  });
};

export default sendResponse;
