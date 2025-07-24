import { initMongoConnection } from './db/initMongoDB.js';
import { startServer } from './server.js';
import express from 'express';

import authRouter from './routers/auth.js';
import publicRouter from './routers/public.js';
import calorieRouter from './routers/calorie.js';
import productRouter from './routers/product.js';

const bootstrap = async () => {
  await initMongoConnection();
  startServer();
};

bootstrap();

const router = express.Router();

router.use('/auth', authRouter);
router.use('/api', publicRouter);
router.use('/api', calorieRouter);
router.use('/api', productRouter);

export default router;