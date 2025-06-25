import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import { corsOptions } from './config/cors';
import config from './config';
import cookieParser from 'cookie-parser';

import { authRouter } from './api/auth.routes';
import { sessionsRouter } from './api/sessions.routes';
import { optionsRouter } from './api/options.routes';
import { usersRouter } from './api/users.routes';
import { ApiError } from './utils/errors';

import { globalLimiter } from './config/rate-limiter';
import helmet from 'helmet';

const app = express();
app.use(cookieParser()); // Middleware để parse cookies

app.set('trust proxy', 1);

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());

app.use(globalLimiter);

// --- Swagger Docs Endpoint ---
if (config.node_env !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📚 API Docs available at http://localhost:${config.port}/api-docs`);
}

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/options', optionsRouter);
app.use('/api/users', usersRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Web Novel API!');
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // Log lỗi ra console để debug

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (config.node_env === 'production') {
      return res.status(500).json({ message: 'An unexpected error occurred.' });
  }

  return res.status(500).json({ message: 'Đã có lỗi xảy ra ở phía server.' });
});

export default app;