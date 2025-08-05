import { Router } from 'express';
import authRouter from './auth.js';
import dailyRouter from './daily.js';
import calorieRouter from './calorie.js';
import productRouter from './product.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/calorie', calorieRouter);
router.use('/daily', dailyRouter);
router.use('/products', productRouter);

export default router;
