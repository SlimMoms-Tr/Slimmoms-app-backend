import { Router } from 'express';
import authRouter from './auth.js';
import dailyRouter from './daily.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/calorie', dailyRouter);

router.use('/daily', dailyRouter);

export default router;
