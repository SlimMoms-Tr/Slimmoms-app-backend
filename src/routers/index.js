import { Router } from 'express';
import authRouter from './auth.js';
import dailyRouter from './daily.js';
import publicRouter from './public.js';
import searchRouter from './product.js';
import rateRouter from './calorie.js';

const router = Router();

router.use('/auth', authRouter);

router.use('/daily', dailyRouter);

router.use('/public', publicRouter);

router.use('/search', searchRouter);

router.use('/api', rateRouter);

export default router;


