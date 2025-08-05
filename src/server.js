import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import router from './routers/index.js';
import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );

  app.use(helmet());

  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://slimmoms-app-frontend.vercel.app',
    'https://slimmoms-app.vercel.app',
    'https://slimmoms-frontend.vercel.app',
  ];

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    }),
  );

  // Product search için özel CORS ayarı
  app.use(
    '/products/search',
    cors({
      origin: allowedOrigins,
      credentials: false,
    }),
  );

  app.use(cookieParser());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10000,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use('/api-docs', swaggerDocs());
  app.use(router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
