// src/middleware/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { ApiError } from '../utils/errors';

// Mở rộng interface Request của Express để thêm thuộc tính userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 1. Đọc token từ cookie 'accessToken'
  if (!req.cookies || !req.cookies.accessToken) {
    throw new ApiError(401, 'Access token is missing.');
  }
  const token = req.cookies.accessToken;

  // 2. Nếu không có token, trả về lỗi 401
  if (!token) {
    // Mã lỗi 401 này sẽ báo cho frontend biết cần phải gọi /refresh-token
    throw new ApiError(401, 'Access token is missing.');
  }

  try {
    // 3. Xác minh token
    const payload = jwt.verify(token, config.jwt.accessTokenSecret) as { userId: string };
    req.userId = payload.userId;
    next();
  } catch (error) {
    // 4. Nếu token hết hạn hoặc không hợp lệ, trả về lỗi 401
    // Frontend sẽ dựa vào lỗi này để gọi /refresh-token
    if (error instanceof jwt.TokenExpiredError) {
      throw new ApiError(401, 'Access token has expired.');
    }
    throw new ApiError(401, 'Invalid access token.');
  }
};