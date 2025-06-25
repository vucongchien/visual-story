import { Request, Response, NextFunction } from 'express';

/**
 * Một middleware không làm gì cả, chỉ gọi next().
 * Dùng để thay thế các middleware khác trong môi trường development.
 */
export const dummyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  next();
};