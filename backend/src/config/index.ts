import dotenv from 'dotenv';
import path from 'path';

// Tải file .env từ thư mục gốc của project
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
  port: process.env.PORT || 8000,
  jwt: {
    expiresIn: (process.env.JWT_EXPIRES_IN ?? '1h') as string,
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET as string,
    accessTokenExpiresIn: (process.env.JWT_ACCESS_TOKEN_EXPIRES_IN ?? '15m') as string,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET as string,
    refreshTokenExpiresInDays: (process.env.JWT_REFRESH_TOKEN_EXPIRES_IN_DAYS ?? 30) as number,
  },
  databaseUrl: process.env.DATABASE_URL as string,
  geminiApiKey: process.env.GEMINI_API_KEY as string,
  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean),
  node_env: process.env.NODE_ENV || 'development',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  },
  apiUrl: (process.env.API_URL || 'http://localhost:8000') as string,
  frontendUrl: (process.env.FRONTEND_URL || 'http://localhost:5173') as string,
};

const requiredEnvVars: [string, unknown][] = [
  ['JWT_ACCESS_TOKEN_SECRET', config.jwt.accessTokenSecret],
  ['JWT_REFRESH_TOKEN_SECRET', config.jwt.refreshTokenSecret],
  ['DATABASE_URL', config.databaseUrl],
  ['GOOGLE_CLIENT_ID', config.google.clientId],
  ['GOOGLE_CLIENT_SECRET', config.google.clientSecret],
];

// Tìm các biến đang bị thiếu
const missingVars = requiredEnvVars.filter(([_, value]) => !value).map(([key]) => key);

// Nếu có biến thiếu, log ra lỗi rõ ràng và dừng chương trình
if (missingVars.length > 0) {
  console.error('FATAL ERROR: Missing required environment variables:');
  missingVars.forEach(varName => console.error(`  - ${varName}`));
  process.exit(1);
}

export default config;