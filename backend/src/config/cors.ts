import config from './index';
import cors from 'cors';

const allowedOrigins = config.allowedOrigins || [];

const corsOptions: cors.CorsOptions = {
  // a. origin: Chỉ cho phép các domain trong danh sách 'allowedOrigins'
  origin: (origin, callback) => {
    // Cho phép các request không có origin (ví dụ: Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

export { corsOptions };