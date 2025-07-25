import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dailyRateRouter from './routers/private/dailyRateRouter.js';
import publicRouter from './routers/public.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import router from './routers/index.js';
import caloriesRouter from './routers/calorie.js';

import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );

  app.use(helmet());

  app.use(cors());
  app.use(cookieParser());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });
  app.use(limiter);

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

app.use('/api/private', dailyRateRouter);
  app.use('/api/calories', caloriesRouter);
  app.use('/api/public', publicRouter);
  app.use(router); 
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
};
