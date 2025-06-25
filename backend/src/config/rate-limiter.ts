import rateLimit from 'express-rate-limit';
import config from './index';
import { dummyMiddleware } from '../middleware/dummy.middleware';

// Limiter chung cho tất cả các API
const productionGlobalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Giới hạn mỗi IP chỉ được 100 requests trong 15 phút
  standardHeaders: true, // Trả về thông tin rate limit trong header `RateLimit-*`
  legacyHeaders: false, // Tắt các header cũ `X-RateLimit-*`
  message: { message: 'Too many requests from this IP, please try again after 15 minutes.' },
});

// Limiter nghiêm ngặt hơn cho các hành động xác thực quan trọng
// (callback, refresh token)
const productionSensitiveAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 10, // Giới hạn mỗi IP chỉ được 10 requests trong 15 phút cho các hành động này
  message: { message: 'Too many authentication attempts from this IP, please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limiter ở mức trung bình cho các hành động ít nhạy cảm hơn (lấy URL, logout)
const productionGeneralAuthLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 30, // Giới hạn mỗi IP chỉ được 30 requests trong 15 phút
    message: { message: 'Too many requests. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

export const globalLimiter = config.node_env === 'production' ? productionGlobalLimiter : dummyMiddleware;
export const sensitiveAuthLimiter = config.node_env === 'production' ? productionSensitiveAuthLimiter : dummyMiddleware;
export const generalAuthLimiter = config.node_env === 'production' ? productionGeneralAuthLimiter : dummyMiddleware;