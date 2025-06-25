import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ApiError } from '../utils/errors';

export const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Lấy lỗi đầu tiên để trả về cho client
        const firstError = error.errors[0];
        const errorMessage = `${firstError.path.join('.')}: ${firstError.message}`;
        throw new ApiError(400, errorMessage);
      }
      next(error);
    }
  };