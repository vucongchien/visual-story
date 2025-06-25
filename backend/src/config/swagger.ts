// src/config/swagger.ts

import swaggerJsdoc from 'swagger-jsdoc';
import config from './index';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Web Novel Game API',
      version: '1.0.0',
      description:
        'An API for an interactive web novel game, powered by AI. This API manages users, game sessions, and interacts with an AI service to generate story content. \n\n' +
        '**Authentication Note:** This API uses a secure cookie-based authentication system. After a successful login, `accessToken` and `refreshToken` are stored in `HttpOnly` cookies. ' +
        'For testing protected endpoints in this Swagger UI, you must first log in through your application, then manually copy the `accessToken` value from your browser\'s developer tools (Application > Cookies) and paste it into the "Authorize" dialog below.',
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Development server',
      },
    ],
    tags: [
        // ... (tags giữ nguyên)
    ],
    components: {
      // --- PHẦN SỬA ĐỔI CHÍNH ---
      securitySchemes: {
        // Vẫn giữ bearerAuth để có thể test trên Swagger UI
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter the Access Token obtained from the `accessToken` cookie after logging in.'
        },
        // Định nghĩa xác thực cookie một cách hình thức (chủ yếu để mô tả)
        cookieAuth: {
            type: 'apiKey',
            in: 'cookie',
            name: 'accessToken', // Tên của cookie access token
            description: 'The `accessToken` is automatically sent by the browser in an HttpOnly cookie.'
        }
      },
      schemas: {
        // ... (tất cả các schema giữ nguyên như trước)
      },
    },
    // Định nghĩa rằng bảo mật mặc định cho các endpoint được đánh dấu là cookieAuth
    // Tuy nhiên, để test được, chúng ta sẽ ghi đè bằng bearerAuth trong từng JSDoc
    security: [
        {
            cookieAuth: []
        }
    ]
  },
  apis: ['./src/api/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;