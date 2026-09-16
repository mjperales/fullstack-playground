import { Request, Response, NextFunction } from 'express';
import { ApiError } from './utils/ApiError';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong',
  });
};
